const express = require('express');
const router = express.Router();
const User = require('../../infrastructure/database/models/UserModel');

// Route Public: Lấy thông tin User để hiện lên Hero và Footer
router.get('/profile', async (req, res) => {
    try {
        // Lấy user đầu tiên (vì portfolio của ông chỉ có 1 admin)
        const user = await User.findOne();
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy thông tin cá nhân' });
        }

        // Tuyệt đối không gửi Password về Frontend
        const userObj = user.toObject();
        delete userObj.password;

        res.json(userObj);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi server khi lấy Profile' });
    }
});

// Route Cập nhật thông tin cá nhân
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Xóa trường password khỏi updateData để tránh việc vô tình đổi pass (nếu làm đổi pass sẽ làm route riêng)
        if (updateData.password) {
            delete updateData.password;
        }

        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { $set: updateData }, 
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Không tìm thấy user để cập nhật' });
        }

        const userObj = updatedUser.toObject();
        delete userObj.password;
        
        res.json(userObj);
    } catch (error) {
        console.error("Lỗi cập nhật user:", error);
        res.status(500).json({ error: 'Lỗi server khi cập nhật Profile' });
    }
});

module.exports = router;