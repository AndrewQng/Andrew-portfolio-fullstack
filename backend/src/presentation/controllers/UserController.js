class UserController {
    constructor({ getPublicProfile, updateUser }) {
        this.getPublicProfile = getPublicProfile;
        this.updateUser = updateUser;
    }

    getProfile = async (req, res) => {
        try {
            // Trích xuất và chuẩn hóa IP
            const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
            const ip = rawIp ? rawIp.replace(/^.*:/, '') : 'local';

            // Thực thi Use Case lấy Profile
            const entity = await this.getPublicProfile.execute(ip);
            if (!entity) {
                return res.status(404).json({ error: 'Không tìm thấy hồ sơ cá nhân' });
            }

            // Gửi hồ sơ công khai về client (Đã ẩn mật khẩu bảo mật)
            res.json(entity.getPublicProfile());
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    updateProfile = async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            // Xóa trường password để tránh vô tình đổi pass (nếu đổi mật khẩu sẽ có Use Case riêng)
            if (updateData.password) {
                delete updateData.password;
            }

            // Thực thi Use Case cập nhật User
            const entity = await this.updateUser.execute(id, updateData);
            if (!entity) {
                return res.status(404).json({ error: 'Không tìm thấy người dùng để cập nhật' });
            }

            // Trả về dữ liệu cập nhật công khai
            res.json(entity.getPublicProfile());
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = UserController;
