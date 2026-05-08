import { useState, useEffect } from 'react';
import SkillBadge from '../ui/SkillBadge.jsx';
import { getAllSkills } from '../../services/skillService.js';

const SkillsOverview = () => {
    const [skills, setSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                // Lấy data từ Backend đã tạo
                const data = await getAllSkills();
                setSkills(data);
            } catch (error) {
                console.error("Lỗi tải kỹ năng:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSkills();
    }, []);

    // Nhóm kỹ năng theo Category (Game, Web, Mobile...)
    const groupedSkills = skills.reduce((acc, skill) => {
        acc[skill.category] = acc[skill.category] || [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <section id="skills" className="py-20 bg-gray-900">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Kỹ Năng & Công Nghệ</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
                </div>

                {isLoading ? (
                    <div className="text-center text-gray-400">Đang tải cấu hình vũ khí...</div>
                ) : (
                    <div className="space-y-12">
                        {Object.entries(groupedSkills).map(([category, items]) => (
                            <div key={category}>
                                <h3 className="text-xl font-semibold text-gray-300 mb-6 uppercase tracking-wider">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {items.map(skill => (
                                        <SkillBadge 
                                            key={skill._id || skill.id} 
                                            name={skill.name} 
                                            level={skill.level} 
                                            iconUrl={skill.iconUrl} 
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default SkillsOverview;