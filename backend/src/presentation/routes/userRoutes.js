const express = require('express');
const container = require('../../container/container');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const userController = container.resolve('userController');

// Route Public: Lấy thông tin User để hiện lên Hero và Footer + tăng bộ đếm lượt truy cập
router.get('/profile', userController.getProfile);

// Route Admin (Yêu cầu Đăng nhập): Cập nhật thông tin cá nhân
router.put('/:id', authMiddleware, userController.updateProfile);

module.exports = router;