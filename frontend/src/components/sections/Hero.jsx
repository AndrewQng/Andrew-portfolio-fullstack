import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaDownload, FaArrowRight, FaLink } from 'react-icons/fa';
import Button from '../ui/Button.jsx';
import { getUserProfile } from '../../services/userService.js';
import { motion } from 'framer-motion';

const getSocialIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return <FaGithub size={24} />;
    if (p.includes('linkedin')) return <FaLinkedin size={24} />;
    if (p.includes('facebook')) return <FaFacebook size={24} />;
    return <FaLink size={24} />;
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

    if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Đang nạp dữ liệu cá nhân...</div>;
    
    const p = profile || {
        fullName: 'Nguyễn Mạnh Quyền',
        jobTitle: 'Software Developer',
        bio: { short: 'Đang kết nối dữ liệu từ Database...' },
        socialLinks: []
    };

    // Khai báo hiệu ứng stagger cho chữ
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Cột trái: Thông tin text (Stagger animation) */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center lg:text-left"
                >
                    <motion.h2 variants={itemVariants} className="font-bold tracking-widest uppercase mb-4 text-sm md:text-base" style={{ color: 'var(--color-primary)' }}>
                        Xin chào, tôi là
                    </motion.h2>
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight transition-colors duration-300">
                        {p.fullName}
                    </motion.h1>
                    <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text mb-6" style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}>
                        {p.jobTitle}
                    </motion.h3>
                    <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed transition-colors duration-300">
                        {p.bio?.short}
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-6 mb-10">
                        {p.socialLinks?.map((social, index) => (
                            <motion.a 
                                whileHover={{ scale: 1.2, y: -5 }}
                                whileTap={{ scale: 0.9 }}
                                key={index} 
                                href={social.url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                aria-label={social.platform}
                            >
                                {getSocialIcon(social.platform)}
                            </motion.a>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                        <motion.a 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#portfolio" 
                            className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all"
                            style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))', boxShadow: '0 10px 25px -5px var(--color-primary)' }}
                        >
                            <FaArrowRight /> Xem Dự Án
                        </motion.a>
                        
                        {p.resumeUrl && (
                            <motion.a 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href={p.resumeUrl} 
                                target="_blank" 
                                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold border-2 transition-all hover:bg-white/5"
                                style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
                            >
                                <FaDownload /> Tải CV
                            </motion.a>
                        )}
                    </motion.div>
                </motion.div>

                {/* Cột phải: Avatar (Floating animation) */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative mx-auto w-72 h-72 md:w-96 md:h-96"
                >
                    <div 
                        className="absolute inset-0 rounded-full blur-2xl opacity-30"
                        style={{ background: 'linear-gradient(to top right, var(--color-primary), var(--color-secondary))' }}
                    />
                    <motion.img 
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        src={p.avatar || 'https://via.placeholder.com/400x400?text=Avatar'} 
                        alt={p.fullName} 
                        className="relative z-10 w-full h-full object-cover rounded-full border-4 border-gray-200 dark:border-gray-800 shadow-2xl transition-colors duration-300"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;