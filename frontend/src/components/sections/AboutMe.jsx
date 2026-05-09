import { useState, useEffect } from 'react';
import { getUserProfile } from '../../services/userService.js';
import { motion } from 'framer-motion';

const AboutMe = () => {
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

    if (loading || !profile?.bio?.full) return null;

    // Trình parse Markdown Đơn giản tự viết để tránh lỗi cần cài thư viện
    const renderMarkdown = (text) => {
        if (!text) return null;
        
        // Split text by double newlines into paragraphs
        const blocks = text.split('\n\n');
        
        return blocks.map((block, index) => {
            // Check if block is a list
            if (block.trim().startsWith('- ') || block.trim().startsWith('* ')) {
                const items = block.split('\n').filter(i => i.trim().length > 0);
                return (
                    <ul key={index} className="list-disc pl-5 mb-4 space-y-2 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        {items.map((item, i) => {
                            const text = item.replace(/^[-*]\s/, '');
                            return <li key={i}>{parseInline(text)}</li>;
                        })}
                    </ul>
                );
            }
            
            // Check if block is a heading
            if (block.trim().startsWith('### ')) {
                return <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white transition-colors duration-300">{parseInline(block.replace('### ', ''))}</h3>;
            }
            if (block.trim().startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white transition-colors duration-300">{parseInline(block.replace('## ', ''))}</h2>;
            }
            if (block.trim().startsWith('# ')) {
                return <h1 key={index} className="text-3xl font-bold mt-10 mb-5 text-gray-900 dark:text-white transition-colors duration-300">{parseInline(block.replace('# ', ''))}</h1>;
            }

            // Normal paragraph
            return (
                <p key={index} className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                    {parseInline(block)}
                </p>
            );
        });
    };

    // Parse bold, italic, links inside a block
    const parseInline = (text) => {
        // This is a naive implementation using dangerouslySetInnerHTML for simplicity
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white transition-colors duration-300">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300">$1</a>');
        
        return <span dangerouslySetInnerHTML={{ __html: html }} />;
    };

    return (
        <section id="about" className="py-20 transition-colors duration-300 relative z-10">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                            Về <span style={{ color: 'var(--color-primary)' }}>Tôi</span>
                        </h2>
                        <div className="w-24 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}></div>
                    </div>

                    <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-800/50 shadow-2xl rounded-3xl p-8 md:p-12 transition-colors duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/30 to-transparent dark:from-white/5 rounded-bl-full pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-white/30 to-transparent dark:from-white/5 rounded-tr-full pointer-events-none"></div>
                        <div className="prose dark:prose-invert max-w-none prose-lg relative z-10">
                            {renderMarkdown(profile.bio.full)}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutMe;
