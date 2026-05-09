const visitCooldowns = new Map();
const COOLDOWN_TIME = 10000; // 10 giây cooldown

class GetPublicProfile {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async execute(ip = 'local') {
        const now = Date.now();
        const lastVisit = visitCooldowns.get(ip);
        let shouldIncrement = false;

        // Kiem tra va ghi nhan cooldown dong bo ngay lap tuc de chan cac request dong thoi (race condition)
        if (!lastVisit || (now - lastVisit) > COOLDOWN_TIME) {
            shouldIncrement = true;
            visitCooldowns.set(ip, now);
        }

        const user = await this.userRepository.findFirst();
        if (!user) return null;

        // Đảm bảo cấu trúc stats đầy đủ
        if (!user.visitorStats) {
            user.visitorStats = { totalViews: 0, uniqueVisitors: 0, ips: [] };
        }

        if (shouldIncrement) {
            user.visitorStats.totalViews += 1;
        }

        // Cộng dồn khách truy cập duy nhất
        if (ip && !user.visitorStats.ips.includes(ip)) {
            user.visitorStats.ips.push(ip);
            user.visitorStats.uniqueVisitors += 1;
        }

        // Cập nhật lại thực thể thông qua UserRepository
        return this.userRepository.update(user.id, user);
    }
}

module.exports = GetPublicProfile;
