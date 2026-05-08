import { useState, useEffect } from 'react';
import { FaAward, FaCertificate } from 'react-icons/fa';
import { getAllCertifications } from '../../services/certificationService';

const ExperienceTimeline = () => {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCerts = async () => {
            try {
                const data = await getAllCertifications();
                // Khuyên dùng: Sắp xếp theo ngày cấp mới nhất lên đầu
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

    if (loading) return <div className="py-20 text-center text-gray-500">Đang tải cấu hình...</div>;

    return (
        <section id="experience" className="py-20 bg-gray-800">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Chứng Chỉ & Học Vấn</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
                </div>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-600 before:to-transparent">
                    {certs.map((cert) => (
                        <div key={cert._id || cert.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-800 bg-gray-900 text-yellow-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10">
                                <FaAward size={16} />
                            </div>
                            
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-gray-700 bg-gray-900 shadow-xl transition-all hover:-translate-y-1 hover:border-gray-600">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                    <h3 className="font-bold text-lg text-white">{cert.title}</h3>
                                    {cert.issueDate && (
                                        <span className="text-xs font-medium px-3 py-1 rounded-full border bg-yellow-900/20 text-yellow-400 border-yellow-800 w-fit whitespace-nowrap">
                                            {new Date(cert.issueDate).toLocaleDateString('vi-VN')}
                                        </span>
                                    )}
                                </div>
                                <div className="text-blue-400 font-medium mb-3">{cert.issuer}</div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">{cert.description}</p>
                                
                                {cert.credentialUrl && (
                                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 font-medium transition-colors">
                                        <FaCertificate /> Xem chứng chỉ xác thực
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceTimeline;