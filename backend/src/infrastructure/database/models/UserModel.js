const mongoose = require('mongoose');

const SocialLinkSchema = new mongoose.Schema({
    platform: { type: String, required: true }, // GitHub, LinkedIn, Facebook...
    url: { type: String, required: true },
    icon: { type: String } // Tên class icon hoặc URL icon
}, { _id: false });

const UserSchema = new mongoose.Schema({
    // Thông tin đăng nhập
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Thông tin cá nhân (About Me)
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    jobTitle: { type: String }, // Ví dụ: Fullstack Developer / Game Designer
    address: { type: String },
    avatar: { type: String }, // Link ảnh đại diện
    resumeUrl: { type: String }, // Link file CV (PDF)
    bio: {
        short: { type: String }, // Hiện ở trang chủ
        full: { type: String }   // Hiện ở trang About chi tiết (Markdown)
    },

    // Mạng xã hội
    socialLinks: [SocialLinkSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);