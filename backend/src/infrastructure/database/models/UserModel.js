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
    brandName: { type: String, default: 'QuyenDev' },
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
    socialLinks: [SocialLinkSchema],

    // Cài đặt giao diện (Settings)
    theme: {
        primaryColor: { type: String, default: '#3b82f6' }, // Xanh dương (blue-500)
        secondaryColor: { type: String, default: '#9333ea' }, // Tím (purple-600)
        mode: { type: String, default: 'dark', enum: ['dark', 'light'] },
        
        // Màu từng Section riêng biệt
        heroPrimary: { type: String, default: '#3b82f6' },
        heroSecondary: { type: String, default: '#9333ea' },
        aboutPrimary: { type: String, default: '#10b981' },
        aboutSecondary: { type: String, default: '#3b82f6' },
        projectsPrimary: { type: String, default: '#f59e0b' },
        projectsSecondary: { type: String, default: '#ef4444' },
        skillsPrimary: { type: String, default: '#ec4899' },
        skillsSecondary: { type: String, default: '#8b5cf6' },
        experiencePrimary: { type: String, default: '#06b6d4' },
        experienceSecondary: { type: String, default: '#3b82f6' }
    },
    visitorStats: {
        totalViews: { type: Number, default: 0 },
        uniqueVisitors: { type: Number, default: 0 },
        ips: { type: [String], default: [] }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);