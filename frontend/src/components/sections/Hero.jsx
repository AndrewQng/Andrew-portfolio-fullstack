import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaDownload, FaArrowRight, FaLink } from 'react-icons/fa';
import Button from '../ui/Button.jsx';
import { getUserProfile } from '../../services/userService.js';

// Hàm helper để render Icon mạng xã hội dựa trên tên Platform từ DB
const getSocialIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return <FaGithub size={24} />;
    if (p.includes('linkedin')) return <FaLinkedin size={24} />;
    if (p.includes('facebook')) return <FaFacebook size={24} />;
    return <FaLink size={24} />; // Icon mặc định nếu không khớp
};

const Hero = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setProfile(data);
            } catch (error) {
                console.error("Lỗi tải Profile:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    // Hiển thị khung skeleton lúc đang tải dữ liệu
    if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center">Đang nạp dữ liệu cá nhân...</div>;
    
    // Nếu chưa có data trong DB, dùng tạm dữ liệu mặc định để không bị vỡ UI
    const p = profile || {
        fullName: 'Nguyễn Mạnh Quyền',
        jobTitle: 'Software Developer',
        bio: { short: 'Đang kết nối dữ liệu từ Database...' },
        socialLinks: []
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gray-950">
            {/* Hiệu ứng nền */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Cột trái: Thông tin text */}
                <div className="text-center lg:text-left">
                    <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm md:text-base">
                        Xin chào, tôi là
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                        {p.fullName}
                    </h1>
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6">
                        {p.jobTitle}
                    </h3>
                    <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        {p.bio?.short}
                    </p>

                    {/* Mạng xã hội lấy từ DB */}
                    <div className="flex items-center justify-center lg:justify-start gap-6 mb-10">
                        {p.socialLinks?.map((social, index) => (
                            <a 
                                key={index} 
                                href={social.url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-gray-400 hover:text-blue-500 transition-colors hover:scale-110 duration-200"
                                aria-label={social.platform}
                            >
                                {getSocialIcon(social.platform)}
                            </a>
                        ))}
                    </div>

                    {/* Nút hành động */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                        <Button href="#portfolio" variant="primary" size="lg" icon={FaArrowRight}>
                            Xem Dự Án
                        </Button>
                        {p.resumeUrl && (
                            <Button href={p.resumeUrl} target="_blank" variant="outline" size="lg" icon={FaDownload}>
                                Tải CV (PDF)
                            </Button>
                        )}
                    </div>
                </div>

                {/* Cột phải: Avatar */}
                <div className="relative mx-auto w-72 h-72 md:w-96 md:h-96">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full animate-pulse blur-2xl opacity-30"></div>
                    <img 
                        src={p.avatar || 'https://via.placeholder.com/400x400?text=Avatar'} 
                        alt={p.fullName} 
                        className="relative z-10 w-full h-full object-cover rounded-full border-4 border-gray-800 shadow-2xl"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;