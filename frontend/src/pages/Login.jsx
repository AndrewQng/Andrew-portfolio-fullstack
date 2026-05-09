import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { loginAPI } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle, FaLock, FaCheckCircle } from 'react-icons/fa';

const Login = () => {
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            navigate('/admin/dashboard');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await loginAPI(username, password);
            
            setIsSuccess(true);
            setIsLoading(false);

            setTimeout(() => {
                login(data.token);
                navigate('/admin/dashboard');
            }, 1500);

        } catch (err) {
            setError(err.response?.data?.error || 'Tài khoản hoặc mật khẩu không chính xác.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
            <AnimatePresence mode="wait">
                {!isSuccess ? (
                    <motion.div 
                        key="login-form"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-md bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-gray-800/50 p-8 rounded-3xl shadow-2xl relative z-10 transition-colors duration-300"
                    >
                        <div className="text-center mb-8">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.2 }}
                                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30"
                                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
                            >
                                <FaLock className="text-white text-2xl" />
                            </motion.div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Admin Panel</h2>
                            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Đăng nhập để quản lý hệ thống</p>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm text-center mb-6"
                            >
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-400 text-sm font-medium mb-2 transition-colors duration-300">Tên tài khoản</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUserCircle className="text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <input 
                                        type="text" 
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                                        placeholder="Nhập tên đăng nhập..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-400 text-sm font-medium mb-2 transition-colors duration-300">Mật khẩu</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <input 
                                        type="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit" 
                                disabled={isLoading}
                                className="w-full text-white font-bold py-3 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 mt-4 disabled:opacity-50 hover:opacity-90"
                                style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    'Đăng nhập ngay'
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success-animation"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="flex flex-col items-center justify-center z-20"
                    >
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 mb-6"
                        >
                            <FaCheckCircle className="text-white text-5xl" />
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-3xl font-bold text-white text-center"
                        >
                            Đăng nhập thành công!
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-green-400 mt-2"
                        >
                            Đang chuẩn bị vào hệ thống...
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Login;