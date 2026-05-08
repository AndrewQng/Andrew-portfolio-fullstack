const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

require('dotenv').config(); 
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Đường dẫn đã được sửa lại cho khớp với cây thư mục thực tế
const connectDB = require('../mongoConnection'); 
const User = require('./UserModel');// Đổi lại đường dẫn cho đúng

async function seedAdmin() {
    try {
        // 1. Kết nối DB bằng file mongoConnection.js có sẵn của dự án
        console.log('Đang kết nối Database...');
        await connectDB();
        console.log('Kết nối thành công!');

        // 2. Kiểm tra xem tài khoản admin "1" đã tồn tại chưa
        const existingAdmin = await User.findOne({ username: '1' });
        if (existingAdmin) {
            console.log('Tài khoản Admin đã tồn tại. Không cần tạo lại.');
            process.exit(0);
        }

        // 3. Hash mật khẩu "1"
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('1', salt);

        // 4. Tạo tài khoản Admin mới 
        // Lưu ý: Phải điền đầy đủ fullName và email vì Schema bắt buộc
        await User.create({
            username: '1',
            password: hashedPassword,
            fullName: 'Super Admin',         // Bắt buộc theo UserModel
            email: 'admin@yourdomain.com'    // Bắt buộc theo UserModel
        });

        console.log('Tạo tài khoản Admin thành công: username: 1 / password: 1');
        process.exit(0);
    } catch (error) {
        console.error('Lỗi khi seed data:', error);
        process.exit(1);
    } finally {
        // Đóng kết nối để script tự tắt
        mongoose.disconnect();
    }
}

seedAdmin();