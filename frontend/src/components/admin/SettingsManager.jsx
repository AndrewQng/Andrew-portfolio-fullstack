import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../../services/userService.js';
import { useToast } from '../../context/ToastContext.jsx';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';

const SettingsManager = () => {
    const [theme, setTheme] = useState({ primaryColor: '#3b82f6', secondaryColor: '#9333ea', mode: 'dark' });
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { showToast } = useToast();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const profile = await getUserProfile();
                setUserId(profile._id || profile.id);
                if (profile.theme) {
                    setTheme(profile.theme);
                }
            } catch (error) {
                showToast('Lỗi tải cài đặt website!', 'error');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        if (!userId) return;
        setIsLoading(true);
        try {
            await updateUserProfile(userId, { theme });
            showToast('Lưu cài đặt thành công! F5 trang chủ để xem thay đổi.', 'success');
            
            // Apply live update for admin preview
            document.documentElement.style.setProperty('--color-primary', theme.primaryColor);
            document.documentElement.style.setProperty('--color-secondary', theme.secondaryColor);
        } catch (error) {
            showToast('Lỗi lưu cài đặt', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && !userId) return <div className="text-gray-400">Đang tải cài đặt...</div>;

    return (
        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-gray-800/50 shadow-2xl transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Cài đặt Website (Tông màu)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-300">Màu chủ đạo (Primary)</label>
                    <div className="flex items-center gap-4">
                        <input 
                            type="color" 
                            value={theme.primaryColor} 
                            onChange={(e) => setTheme({...theme, primaryColor: e.target.value})}
                            className="w-14 h-14 rounded cursor-pointer bg-transparent border-0 p-0"
                        />
                        <Input 
                            value={theme.primaryColor} 
                            onChange={(e) => setTheme({...theme, primaryColor: e.target.value})}
                            className="flex-1"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-300">Màu phụ (Secondary)</label>
                    <div className="flex items-center gap-4">
                        <input 
                            type="color" 
                            value={theme.secondaryColor} 
                            onChange={(e) => setTheme({...theme, secondaryColor: e.target.value})}
                            className="w-14 h-14 rounded cursor-pointer bg-transparent border-0 p-0"
                        />
                        <Input 
                            value={theme.secondaryColor} 
                            onChange={(e) => setTheme({...theme, secondaryColor: e.target.value})}
                            className="flex-1"
                        />
                    </div>
                </div>
            </div>

            {/* Preview Box */}
            <div className="mb-8 p-6 rounded-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden bg-gray-50 dark:bg-[#0f172a] transition-colors duration-300">
                <div className="absolute top-[-50%] left-[-10%] w-64 h-64 rounded-full blur-[80px]" style={{ background: theme.primaryColor, opacity: 0.2 }}></div>
                <div className="absolute bottom-[-50%] right-[-10%] w-64 h-64 rounded-full blur-[80px]" style={{ background: theme.secondaryColor, opacity: 0.2 }}></div>
                
                <h3 className="relative z-10 text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Preview Hiệu ứng Glow</h3>
                <div className="relative z-10 flex gap-4">
                    <button className="px-6 py-2 rounded-lg font-bold text-white shadow-lg" style={{ background: `linear-gradient(to right, ${theme.primaryColor}, ${theme.secondaryColor})` }}>
                        Nút Chính
                    </button>
                    <button className="px-6 py-2 rounded-lg font-bold bg-gray-900 border" style={{ borderColor: theme.primaryColor, color: theme.primaryColor }}>
                        Nút Phụ
                    </button>
                </div>
            </div>

            <Button onClick={handleSave} isLoading={isLoading}>Lưu Cài Đặt</Button>
        </div>
    );
};

export default SettingsManager;
