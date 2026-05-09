const visitCooldowns = new Map();
const COOLDOWN_TIME = 10000; // 10 giây cooldown

class GetPublicProfile {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async execute(ip = 'local') {
        const user = await this.userRepository.findFirst();
        if (!user) return null;

        // Đảm bảo cấu trúc stats đầy đủ
        if (!user.visitorStats) {
            user.visitorStats = { totalViews: 0, uniqueVisitors: 0, ips: [] };
        }

        const now = Date.now();
        const lastVisit = visitCooldowns.get(ip);

        // Cộng dồn lượt xem nếu hết thời gian chờ giãn cách
        if (!lastVisit || (now - lastVisit) > COOLDOWN_TIME) {
            user.visitorStats.totalViews += 1;
            visitCooldowns.set(ip, now);
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
