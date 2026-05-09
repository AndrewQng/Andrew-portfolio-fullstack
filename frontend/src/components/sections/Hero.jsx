import { useState, useEffect } from 'react';
import { 
    FaGithub, FaLinkedin, FaFacebook, FaTwitter, FaInstagram, 
    FaYoutube, FaTiktok, FaBehance, FaDribbble, FaGlobe, 
    FaDownload, FaArrowRight, FaLink 
} from 'react-icons/fa';
import Button from '../ui/Button.jsx';
import { getUserProfile } from '../../services/userService.js';
import { motion } from 'framer-motion';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';

const getSocialIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return <FaGithub size={24} />;
    if (p.includes('linkedin')) return <FaLinkedin size={24} />;
    if (p.includes('facebook')) return <FaFacebook size={24} />;
    if (p.includes('twitter') || p.includes('x.com')) return <FaTwitter size={24} />;
    if (p.includes('instagram')) return <FaInstagram size={24} />;
    if (p.includes('youtube')) return <FaYoutube size={24} />;
    if (p.includes('tiktok')) return <FaTiktok size={24} />;
    if (p.includes('behance')) return <FaBehance size={24} />;
    if (p.includes('dribbble')) return <FaDribbble size={24} />;
    if (p.includes('website')) return <FaGlobe size={24} />;
    return <FaLink size={24} />;
};

const Hero = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

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

    if (loading) return <LoadingSpinner text="Đang nạp dữ liệu cá nhân..." fullPage={true} />;
    
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
        <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16 transition-colors duration-300 overflow-hidden">
            {/* Interactive/Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Ambient pulsing blob 1 */}
                <motion.div 
                    animate={{
                        x: [0, 80, -40, 0],
                        y: [0, -60, 80, 0],
                        scale: [1, 1.15, 0.85, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full blur-[100px] md:blur-[130px] opacity-15 dark:opacity-25"
                    style={{ background: 'var(--color-primary)' }}
                />
                {/* Ambient pulsing blob 2 */}
                <motion.div 
                    animate={{
                        x: [0, -100, 60, 0],
                        y: [0, 80, -50, 0],
                        scale: [1, 0.85, 1.2, 1],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full blur-[120px] md:blur-[150px] opacity-15 dark:opacity-20"
                    style={{ background: 'var(--color-secondary)' }}
                />
                {/* Floating micro-particle bokeh orbs */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ 
                            x: Math.random() * 1400, 
                            y: Math.random() * 900, 
                            opacity: Math.random() * 0.25 + 0.08,
                            scale: Math.random() * 0.4 + 0.3
                        }}
                        animate={{
                            y: ['-10vh', '110vh'],
                            x: ['0vw', `${Math.random() * 6 - 3}vw`]
                        }}
                        transition={{
                            duration: Math.random() * 25 + 25,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * -25
                        }}
                        className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-500/30 dark:bg-white/10 blur-[1.5px]"
                    />
                ))}
            </div>

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
                    {p.avatar && !imageError ? (
                        <motion.img 
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            src={p.avatar} 
                            alt={p.fullName} 
                            onError={() => setImageError(true)}
                            className="relative z-10 w-full h-full object-cover rounded-full border-4 border-gray-200 dark:border-gray-800 shadow-2xl transition-colors duration-300"
                        />
                    ) : (
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10 w-full h-full rounded-full border-4 border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden flex items-center justify-center transition-colors duration-300 bg-gray-100/50 dark:bg-gray-950/40 backdrop-blur-md"
                        >
                            {/* Glowing ambient ring */}
                            <div 
                                className="absolute inset-4 rounded-full opacity-20 animate-pulse"
                                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
                            />
                            {/* Vector SVG avatar silhouette */}
                            <svg 
                                className="w-1/2 h-1/2 text-gray-400 dark:text-gray-500 relative z-20" 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;