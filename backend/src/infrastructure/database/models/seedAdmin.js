const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

require('dotenv').config(); 
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Đường dẫn đã được sửa lại cho khớp với cây thư mục thực tế
const connectDB = require('../mongoConnection'); 
const User = require('./UserModel');
const Project = require('./ProjectModel');
const Skill = require('./SkillModel');
const Certification = require('./CertModel');

const seedDatabase = async () => {
    try {
        // 1. Kết nối Database
        console.log('Đang kết nối tới MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Kết nối thành công!');

        // 2. Xóa dữ liệu cũ (Tùy chọn: Để tránh bị trùng lặp khi chạy nhiều lần)
        console.log('Đang dọn dẹp dữ liệu cũ...');
        await User.deleteMany({});
        await Project.deleteMany({});
        await Skill.deleteMany({});
        await Certification.deleteMany({});

        // 3. Seed User (Thông tin cá nhân)
        console.log('Đang tạo User...');
        const hashedPassword = await bcrypt.hash('admin123', 10); // Pass mặc định: admin123
        await User.create({
            username: 'admin',
            password: hashedPassword,
            fullName: 'Nguyễn Mạnh Quyền',
            email: 'contact@example.com',
            phone: '0123.456.789',
            jobTitle: 'Software Developer',
            address: 'Hà Nội, Việt Nam',
            avatar: 'https://avatars.githubusercontent.com/u/9919?v=4', // Đổi link thật của ông sau
            resumeUrl: '#',
            bio: {
                short: 'Sinh viên IT đam mê kiến trúc phần mềm, phát triển game và ứng dụng di động.',
                full: 'Tập trung vào Clean Architecture, cấu trúc dữ liệu và giải thuật. Hiện đang theo học tại Đại học Xây dựng Hà Nội (HUCE) và phát triển các sản phẩm cá nhân kết hợp giữa tư duy logic và thẩm mỹ.'
            },
            socialLinks: [
                { platform: 'GitHub', url: 'https://github.com/', icon: 'FaGithub' },
                { platform: 'LinkedIn', url: 'https://linkedin.com/', icon: 'FaLinkedin' }
            ]
        });

        // 4. Seed Projects (Dự án)
        console.log('Đang tạo Projects...');
        await Project.insertMany([
            {
                title: 'Mathicard',
                slug: 'mathicard',
                category: 'Game', // Khớp ProjectCategory.GAME
                status: 'In Progress', // Khớp ProjectStatus.IN_PROGRESS
                description: { 
                    short: 'Game thẻ bài turn-based PvP kết hợp tính toán toán học logic.',
                    full: 'Phát triển bằng C# và Godot Engine. Áp dụng Clean Architecture, quản lý state bài và logic tính toán sát thương dựa trên biểu thức.'
                },
                thumbnail: 'https://images.unsplash.com/photo-1611996575749-79a3a250f563?q=80&w=600&auto=format&fit=crop',
                links: { repo: 'https://github.com/', live: '', download: '' }
            },
            {
                title: 'RPG-TaskBoard',
                slug: 'rpg-taskboard',
                category: 'Mobile', // Khớp ProjectCategory.MOBILE
                status: 'Completed', // Khớp ProjectStatus.COMPLETED
                description: { 
                    short: 'Ứng dụng quản lý công việc phong cách nhập vai RPG.',
                    full: 'Sử dụng Android Jetpack Compose, MVVM pattern, LiveData. Giúp người dùng có động lực làm việc thông qua hệ thống nhiệm vụ và phần thưởng.'
                },
                thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop',
                links: { repo: 'https://github.com/', live: '', download: 'https://play.google.com' }
            }
        ]);

        // 5. Seed Skills (Kỹ năng)
        console.log('Đang tạo Skills...');
        await Skill.insertMany([
            { name: 'C#', category: 'Game Dev', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', displayOrder: 1 },
            { name: 'Godot Engine', category: 'Game Dev', level: 'Advanced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg', displayOrder: 2 },
            { name: 'Android / Jetpack Compose', category: 'Mobile', level: 'Advanced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg', displayOrder: 3 },
            { name: 'React / Next.js', category: 'Frontend', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', displayOrder: 4 },
            { name: 'Linux / Ubuntu', category: 'Tools', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', displayOrder: 5 },
            { name: 'Git', category: 'Tools', level: 'Advanced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', displayOrder: 6 }
        ]);
        
        // 6. Seed Certifications / Experience (Hành trình)
        console.log('Đang tạo Certifications...');
        await Certification.insertMany([
            {
                title: 'Học bổng Tiếng Nhật',
                issuer: 'FPT Software',
                issueDate: new Date('2024-11-01'),
                description: 'Đạt học bổng đào tạo ngôn ngữ từ tập đoàn công nghệ lớn, yêu cầu duy trì GPA cao trong quá trình học tập.'
            },
            {
                title: 'Thành viên (Gen 6)',
                issuer: 'WOA CNVT Art Club',
                issueDate: new Date('2024-09-01'),
                description: 'Tham gia ban chuyên môn, thiết kế asset 8-bit pixel art và poster cho các dự án game nội bộ.'
            },
            {
                title: 'Chứng chỉ ngoại ngữ TOEIC',
                issuer: 'IIG Vietnam',
                issueDate: new Date('2025-05-27'),
                description: 'Đạt chuẩn đầu ra tiếng Anh phục vụ cho môi trường làm việc quốc tế và nghiên cứu tài liệu kỹ thuật.'
            }
        ]);

        console.log('🎉 Đã seed dữ liệu thành công!');
        process.exit(0);
    } catch (error) {
        console.error('Lỗi khi seed dữ liệu:', error);
        process.exit(1);
    }
};

seedDatabase();