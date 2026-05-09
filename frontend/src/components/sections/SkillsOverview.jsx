import { useState, useEffect } from 'react';
import SkillBadge from '../ui/SkillBadge.jsx';
import { getAllSkills } from '../../services/skillService.js';
import { motion } from 'framer-motion';

const SkillsOverview = () => {
    const [skills, setSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
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

    const groupedSkills = skills.reduce((acc, skill) => {
        acc[skill.category] = acc[skill.category] || [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.5, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 10 } }
    };

    return (
        <section id="skills" className="py-20 relative overflow-hidden transition-colors duration-300">
            {/* Background element */}
            <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ background: 'var(--color-primary)', transform: 'translateY(-50%)' }} />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Kỹ Năng & Công Nghệ</h2>
                    <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}></div>
                </motion.div>

                {isLoading ? (
                    <div className="text-center text-gray-500 dark:text-gray-400">Đang tải vũ khí công nghệ...</div>
                ) : (
                    <div className="space-y-16">
                        {Object.entries(groupedSkills).map(([category, items], idx) => (
                            <motion.div 
                                key={category}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, type: 'spring' }}
                                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-800/50 shadow-xl rounded-3xl p-8 transition-colors duration-300"
                            >
                                <h3 className="text-xl font-bold mb-6 uppercase tracking-wider flex items-center gap-4" style={{ color: 'var(--color-primary)' }}>
                                    {category}
                                    <div className="flex-1 h-px bg-white/50 dark:bg-gray-700/50 transition-colors duration-300"></div>
                                </h3>
                                <motion.div 
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="flex flex-wrap gap-4"
                                >
                                    {items.map(skill => (
                                        <motion.div key={skill._id || skill.id} variants={itemVariants}>
                                            <SkillBadge 
                                                name={skill.name} 
                                                level={skill.level} 
                                                iconUrl={skill.iconUrl} 
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default SkillsOverview;