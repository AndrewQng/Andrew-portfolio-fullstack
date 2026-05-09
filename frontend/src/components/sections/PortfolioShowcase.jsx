import { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';
import { getAllProjects } from '../../services/projectService.js';
import { motion } from 'framer-motion';

const PortfolioShowcase = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getAllProjects();
                setProjects(data);
            } catch (error) {
                console.error("Lỗi lấy dữ liệu dự án:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) return <div className="py-20 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">Đang tải các dự án...</div>;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
    };

    return (
        <section id="portfolio" className="py-24 relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ background: 'var(--color-secondary)' }} />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Dự Án Nổi Bật</h2>
                    <div className="w-20 h-1 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}></div>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg transition-colors duration-300">
                        Những sản phẩm tâm huyết từ các ứng dụng thực tế cho đến các trò chơi giải trí.
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
                            Chưa có dự án nào. Hãy vào Admin để thêm mới nhé!
                        </div>
                    ) : (
                        projects.map((project) => (
                            <motion.div 
                                variants={cardVariants}
                                whileHover={{ y: -10 }}
                                key={project._id || project.id} 
                                className="group flex flex-col h-full bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-800/50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative"
                                style={{ hoverBorderColor: 'var(--color-primary)' }}
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    <motion.div 
                                        className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-gray-900 via-transparent to-transparent z-10 opacity-60"
                                    />
                                    <img 
                                        src={project.thumbnail || 'https://via.placeholder.com/600x400?text=No+Image'} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    />
                                    <div 
                                        className="absolute top-4 right-4 z-20 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-md"
                                        style={{ backgroundColor: 'var(--color-primary)', opacity: 0.9 }}
                                    >
                                        {project.category}
                                    </div>
                                </div>

                                {/* Nội dung */}
                                <div className="p-6 flex flex-col flex-grow relative z-20 transition-colors duration-500 group-hover:bg-white/30 dark:group-hover:bg-gray-800/30">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent bg-clip-text transition-colors duration-300"
                                            style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}
                                        >
                                            {project.title}
                                        </h3>
                                        <span className={`text-[10px] px-3 py-1 rounded-full border uppercase tracking-wider font-bold ${
                                            project.status === 'Completed' ? 'border-green-500 text-green-700 bg-green-100 dark:border-green-500/50 dark:text-green-400 dark:bg-green-900/20' : 
                                            project.status === 'In Progress' ? 'border-yellow-500 text-yellow-700 bg-yellow-100 dark:border-yellow-500/50 dark:text-yellow-400 dark:bg-yellow-900/20' : 
                                            'border-gray-300 text-gray-600 bg-gray-100 dark:border-gray-500/50 dark:text-gray-400 dark:bg-gray-900/20'
                                        }`}>
                                            {project.status === 'Completed' ? 'Hoàn thành' : project.status === 'In Progress' ? 'Đang phát triển' : 'Kế hoạch'}
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow leading-relaxed transition-colors duration-300">
                                        {project.description?.short || project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    {project.techStack && project.techStack.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.techStack.slice(0, 3).map((tech, i) => (
                                                <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-gray-700 dark:text-gray-300 border border-white/50 dark:border-gray-700/50 transition-colors duration-300 font-medium shadow-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.techStack.length > 3 && (
                                                <span className="text-xs px-3 py-1.5 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-gray-500 border border-white/50 dark:border-gray-700/50 transition-colors duration-300 font-medium shadow-sm">
                                                    +{project.techStack.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    
                                    {/* Nút chức năng */}
                                    <div className="flex flex-wrap gap-3 mt-auto pt-5 border-t border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300">
                                        {project.links?.repo && (
                                            <a href={project.links.repo} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/60 dark:bg-gray-800/60 hover:bg-white/90 dark:hover:bg-gray-700/80 backdrop-blur-sm rounded-full transition-colors border border-white/50 dark:border-gray-700/50 shadow-sm">
                                                <FaGithub /> Mã nguồn
                                            </a>
                                        )}
                                        {project.links?.live && (
                                            <a href={project.links.live} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-bold text-white rounded-full transition-all hover:opacity-90 shadow-lg" style={{ background: 'var(--color-primary)' }}>
                                                <FaExternalLinkAlt /> Live Demo
                                            </a>
                                        )}
                                        {project.links?.download && !project.links?.live && (
                                            <a href={project.links.download} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-bold text-white rounded-full transition-all hover:opacity-90 shadow-lg" style={{ background: 'var(--color-secondary)' }}>
                                                <FaDownload /> Tải APK
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default PortfolioShowcase;