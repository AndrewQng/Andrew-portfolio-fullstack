import { useState, useEffect } from 'react';
import { FaAward, FaCertificate } from 'react-icons/fa';
import { getAllCertifications } from '../../services/certificationService';
import { motion } from 'framer-motion';

const ExperienceTimeline = () => {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCerts = async () => {
            try {
                const data = await getAllCertifications();
                const sorted = data.sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));
                setCerts(sorted);
            } catch (error) {
                console.error("Lỗi lấy dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCerts();
    }, []);

    if (loading) return <div className="py-20 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 transition-colors duration-300">Đang tải cấu hình...</div>;

    const lineVariants = {
        hidden: { height: 0 },
        visible: { height: '100%', transition: { duration: 1.5, ease: "easeInOut" } }
    };

    return (
        <section id="experience" className="py-20 transition-colors duration-300 relative z-10">
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Chứng Chỉ & Học Vấn</h2>
                    <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}></div>
                </motion.div>

                <div className="relative">
                    {/* Animated vertical line */}
                    <motion.div 
                        variants={lineVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="absolute left-5 md:left-1/2 -translate-x-px w-0.5"
                        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-primary), var(--color-secondary), transparent)' }}
                    />

                    <div className="space-y-12">
                        {certs.map((cert, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div 
                                    key={cert._id || cert.id} 
                                    initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, type: 'spring', delay: index * 0.1 }}
                                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                                >
                                    <div 
                                        className="flex items-center justify-center w-10 h-10 rounded-full border-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10 transition-colors duration-300 group-hover:bg-white dark:group-hover:bg-gray-800"
                                        style={{ borderColor: 'var(--color-primary)', color: 'var(--color-secondary)' }}
                                    >
                                        <FaAward size={16} />
                                    </div>
                                    
                                    <motion.div 
                                        whileHover={{ scale: 1.02 }}
                                        className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl border border-white/50 dark:border-gray-800/50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl shadow-xl transition-all duration-300"
                                        style={{ hoverBorderColor: 'var(--color-primary)' }}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-transparent bg-clip-text transition-colors duration-300"
                                                style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}>
                                                {cert.title}
                                            </h3>
                                            {cert.issueDate && (
                                                <span className="text-xs font-bold px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 w-fit whitespace-nowrap transition-colors duration-300">
                                                    {new Date(cert.issueDate).toLocaleDateString('vi-VN')}
                                                </span>
                                            )}
                                        </div>
                                        <div className="font-medium mb-3" style={{ color: 'var(--color-primary)' }}>{cert.issuer}</div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 transition-colors duration-300">{cert.description}</p>
                                        
                                        {cert.credentialUrl && (
                                            <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3" style={{ color: 'var(--color-secondary)' }}>
                                                <FaCertificate /> Xem chứng chỉ xác thực
                                            </a>
                                        )}
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceTimeline;