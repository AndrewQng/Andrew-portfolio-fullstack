import { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';
import { getAllProjects } from '../../services/projectService.js';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';

const PortfolioShowcase = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Gọi API lấy danh sách dự án từ Database
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

    if (loading) return <div className="py-20 text-center text-gray-500">Đang tải các dự án...</div>;

    return (
        <section id="portfolio" className="py-20 bg-gray-950">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Dự Án Nổi Bật</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Những sản phẩm tâm huyết từ các ứng dụng thực tế cho đến các trò chơi tư duy logic.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">
                            Chưa có dự án nào. Hãy vào Admin để thêm mới nhé!
                        </div>
                    ) : (
                        projects.map((project) => (
                            <Card key={project._id || project.id} className="flex flex-col h-full bg-gray-900 border-gray-800">
                                {/* Thumbnail */}
                                <div className="relative aspect-video overflow-hidden bg-gray-800">
                                    <img 
                                        src={project.thumbnail || 'https://via.placeholder.com/600x400?text=No+Image'} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                                    />
                                    <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        {project.category}
                                    </div>
                                </div>

                                {/* Nội dung */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                        <span className={`text-[10px] px-2 py-1 rounded border uppercase tracking-wider ${
                                            project.status === 'COMPLETED' ? 'border-green-500/50 text-green-400 bg-green-900/20' : 
                                            project.status === 'ONGOING' ? 'border-yellow-500/50 text-yellow-400 bg-yellow-900/20' : 
                                            'border-gray-500/50 text-gray-400 bg-gray-900/20'
                                        }`}>
                                            {project.status === 'COMPLETED' ? 'Hoàn thành' : project.status === 'ONGOING' ? 'Đang phát triển' : 'Kế hoạch'}
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                                        {project.description?.short || project.description}
                                    </p>
                                    
                                    {/* Nút chức năng điều hướng */}
                                    <div className="flex flex-wrap gap-3 mt-auto pt-5 border-t border-gray-800/50">
                                        {project.links?.repo && (
                                            <Button href={project.links.repo} target="_blank" variant="ghost" size="sm" icon={FaGithub}>Mã nguồn</Button>
                                        )}
                                        {project.links?.live && (
                                            <Button href={project.links.live} target="_blank" variant="primary" size="sm" icon={FaExternalLinkAlt}>Live Demo</Button>
                                        )}
                                        {project.links?.download && (
                                            <Button href={project.links.download} target="_blank" variant="outline" size="sm" icon={FaDownload}>Tải APK</Button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default PortfolioShowcase;