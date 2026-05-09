import { useState } from 'react';
import Input from '../ui/Input.jsx';
import TextArea from '../ui/TextArea.jsx';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Giả lập gửi mail 1.5s
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            
            // Tắt thông báo sau 3s
            setTimeout(() => {
                setIsSuccess(false);
                e.target.reset();
            }, 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-20 transition-colors duration-300 relative z-10">
            {/* Ánh sáng nền */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-[100%] blur-[120px] opacity-10 pointer-events-none" style={{ background: 'var(--color-secondary)' }} />

            <div className="max-w-3xl mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Kết Nối Với Tôi</h2>
                    <div className="w-20 h-1 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}></div>
                    <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Bạn có dự án thú vị hoặc cơ hội hợp tác? Hãy để lại lời nhắn nhé.</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <div className="absolute inset-0 rounded-3xl blur-md opacity-50" style={{ background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))', zIndex: -1 }}></div>
                    
                    <form onSubmit={handleSubmit} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/50 dark:border-gray-800/50 shadow-2xl relative overflow-hidden transition-colors duration-300">
                        
                        <AnimatePresence>
                            {isSuccess && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-3xl"
                                >
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [0, 1.2, 1] }}
                                        transition={{ duration: 0.5 }}
                                        className="text-6xl mb-4"
                                        style={{ color: 'var(--color-primary)' }}
                                    >
                                        <FaCheckCircle />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Đã gửi tin nhắn!</h3>
                                    <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Tôi sẽ phản hồi bạn sớm nhất có thể.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div whileFocus={{ scale: 1.02 }} className="transition-transform">
                                    <Input label="Tên của bạn" placeholder="Ví dụ: John Doe" required disabled={isSubmitting} />
                                </motion.div>
                                <motion.div whileFocus={{ scale: 1.02 }} className="transition-transform">
                                    <Input label="Email liên hệ" type="email" placeholder="john@example.com" required disabled={isSubmitting} />
                                </motion.div>
                            </div>
                            <motion.div whileFocus={{ scale: 1.01 }} className="transition-transform">
                                <Input label="Chủ đề" placeholder="Bạn muốn thảo luận về việc gì?" required disabled={isSubmitting} />
                            </motion.div>
                            <motion.div whileFocus={{ scale: 1.01 }} className="transition-transform">
                                <TextArea label="Nội dung tin nhắn" rows={5} placeholder="Nhập chi tiết lời nhắn của bạn ở đây..." required disabled={isSubmitting} />
                            </motion.div>
                            
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center gap-2 py-4 rounded-xl font-bold text-white shadow-lg transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}
                            >
                                {isSubmitting ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <><FaPaperPlane /> Gửi Tin Nhắn</>
                                )}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;