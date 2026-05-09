import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../../services/userService.js';
import { useToast } from '../../context/ToastContext.jsx';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import AdminHeader from '../ui/AdminHeader.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import ErrorCard from '../ui/ErrorCard.jsx';
import { 
    FaPalette, FaHome, FaUser, FaBriefcase, FaCode, FaGraduationCap,
    FaEye, FaChevronRight
} from 'react-icons/fa';

const defaultTheme = {
    primaryColor: '#3b82f6',
    secondaryColor: '#9333ea',
    mode: 'dark',
    heroPrimary: '#3b82f6',
    heroSecondary: '#9333ea',
    aboutPrimary: '#10b981',
    aboutSecondary: '#3b82f6',
    projectsPrimary: '#f59e0b',
    projectsSecondary: '#ef4444',
    skillsPrimary: '#ec4899',
    skillsSecondary: '#8b5cf6',
    experiencePrimary: '#06b6d4',
    experienceSecondary: '#3b82f6'
};

const TABS = [
    { 
        id: 'global', 
        label: 'Toàn trang / Mặc định', 
        primaryKey: 'primaryColor', 
        secondaryKey: 'secondaryColor', 
        defaultPrimary: '#3b82f6', 
        defaultSecondary: '#9333ea', 
        icon: FaPalette,
        desc: 'Tông màu chủ đạo và màu phụ mặc định cho toàn bộ trang web.' 
    },
    { 
        id: 'hero', 
        label: 'Trang chủ / Banner Hero', 
        primaryKey: 'heroPrimary', 
        secondaryKey: 'heroSecondary', 
        defaultPrimary: '#3b82f6', 
        defaultSecondary: '#9333ea', 
        icon: FaHome,
        desc: 'Màu nền mờ ảo, các luồng sáng ambient, và chữ nhấn nổi bật ở lời chào mở đầu.' 
    },
    { 
        id: 'about', 
        label: 'Giới thiệu bản thân (About)', 
        primaryKey: 'aboutPrimary', 
        secondaryKey: 'aboutSecondary', 
        defaultPrimary: '#10b981', 
        defaultSecondary: '#3b82f6', 
        icon: FaUser,
        desc: 'Tông màu làm nổi bật chức danh, trích dẫn, và các khối chữ chính trong bio.' 
    },
    { 
        id: 'projects', 
        label: 'Danh mục dự án (Projects)', 
        primaryKey: 'projectsPrimary', 
        secondaryKey: 'projectsSecondary', 
        defaultPrimary: '#f59e0b', 
        defaultSecondary: '#ef4444', 
        icon: FaBriefcase,
        desc: 'Màu của thẻ viền phát sáng, các tag công nghệ và nút bấm liên kết github.' 
    },
    { 
        id: 'skills', 
        label: 'Kỹ năng chuyên môn (Skills)', 
        primaryKey: 'skillsPrimary', 
        secondaryKey: 'skillsSecondary', 
        defaultPrimary: '#ec4899', 
        defaultSecondary: '#8b5cf6', 
        icon: FaCode,
        desc: 'Màu các viền hộp kỹ năng và thanh phần trăm năng lực hoạt họa.' 
    },
    { 
        id: 'experience', 
        label: 'Kinh nghiệm & Chứng chỉ', 
        primaryKey: 'experiencePrimary', 
        secondaryKey: 'experienceSecondary', 
        defaultPrimary: '#06b6d4', 
        defaultSecondary: '#3b82f6', 
        icon: FaGraduationCap,
        desc: 'Màu của các chấm mốc thời gian trên timeline và các huy hiệu chứng chỉ.' 
    }
];

const SettingsManager = () => {
    const [theme, setTheme] = useState(defaultTheme);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTabId, setActiveTabId] = useState('global');
    const { showToast } = useToast();

    const fetchSettings = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const profile = await getUserProfile();
            setUserId(profile._id || profile.id);
            if (profile.theme) {
                setTheme({ ...defaultTheme, ...profile.theme });
            }
        } catch (err) {
            console.error(err);
            setError({
                status: err.response?.status || 500,
                message: err.response?.data?.message || err.message || 'Lỗi kết nối tới máy chủ'
            });
            showToast('Lỗi tải cấu hình tông màu!', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
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
            showToast('Lỗi lưu cấu hình tông màu', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const activeTab = TABS.find(t => t.id === activeTabId) || TABS[0];
    const activePrimary = theme[activeTab.primaryKey] || activeTab.defaultPrimary;
    const activeSecondary = theme[activeTab.secondaryKey] || activeTab.defaultSecondary;

    // Render a high-end dynamic visual mockup card representing the customized section in real time
    const renderLiveMockPreview = () => {
        switch (activeTab.id) {
            case 'global':
                return (
                    <div className="border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 bg-white dark:bg-gray-950 relative overflow-hidden h-56 flex flex-col justify-between transition-all duration-300 shadow-inner">
                        {/* Fake Navbar */}
                        <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-900 pb-2.5">
                            <span className="text-sm font-black tracking-wider" style={{ color: activePrimary }}>Quyen<span className="text-gray-900 dark:text-white font-medium">Dev</span></span>
                            <div className="flex gap-3 text-[10px] text-gray-400">
                                <span>Dự án</span>
                                <span>Kỹ năng</span>
                            </div>
                        </div>
                        {/* Fake Body */}
                        <div className="my-auto text-center space-y-2">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Global Branding</p>
                            <h4 className="text-lg font-extrabold text-gray-900 dark:text-white leading-tight">Thiết kế phong cách riêng</h4>
                            <div className="flex gap-2.5 justify-center mt-2">
                                <span className="px-3.5 py-1.5 rounded-lg text-[10px] font-bold text-white shadow-lg transition-all" style={{ background: `linear-gradient(135deg, ${activePrimary}, ${activeSecondary})` }}>Nút chính</span>
                                <span className="px-3.5 py-1.5 rounded-lg text-[10px] font-bold bg-transparent border transition-all" style={{ borderColor: activePrimary, color: activePrimary }}>Nút phụ</span>
                            </div>
                        </div>
                        <div className="absolute -bottom-12 -right-12 w-28 h-28 rounded-full blur-[40px] opacity-20" style={{ backgroundColor: activePrimary }} />
                        <div className="absolute -top-12 -left-12 w-28 h-28 rounded-full blur-[40px] opacity-20" style={{ backgroundColor: activeSecondary }} />
                    </div>
                );
            case 'hero':
                return (
                    <div className="border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 bg-white dark:bg-gray-950 relative overflow-hidden h-56 flex items-center justify-center transition-all duration-300 shadow-inner">
                        {/* Pulsing gradient blobs */}
                        <div className="absolute top-1/4 left-1/4 w-28 h-28 rounded-full blur-[35px] opacity-25 animate-pulse" style={{ backgroundColor: activePrimary }} />
                        <div className="absolute bottom-1/4 right-1/4 w-28 h-28 rounded-full blur-[35px] opacity-25 animate-pulse" style={{ backgroundColor: activeSecondary }} />
                        
                        <div className="relative z-10 text-center space-y-2.5 max-w-xs">
                            <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/40 dark:bg-gray-900/40 border border-gray-200/50 dark:border-gray-800/50 shadow-sm" style={{ color: activePrimary }}>Xin chào, tôi là</span>
                            <h4 className="text-2xl font-black text-gray-900 dark:text-white leading-none">
                                <span style={{ color: activePrimary }}>Andrew</span> Ng
                            </h4>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Fullstack Software Engineer</p>
                        </div>
                    </div>
                );
            case 'about':
                return (
                    <div className="border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 bg-white dark:bg-gray-950 relative overflow-hidden h-56 flex flex-col justify-center transition-all duration-300 shadow-inner">
                        <div className="space-y-3">
                            <span className="text-xs font-bold uppercase tracking-widest border-b-2 pb-1 inline-block" style={{ color: activePrimary, borderColor: activeSecondary }}>Giới thiệu</span>
                            <h4 className="text-base font-bold text-gray-800 dark:text-gray-200 leading-snug">Tôi tạo dựng các ứng dụng web tối tân với hiệu suất vượt trội.</h4>
                            <p className="text-[11px] text-gray-400 line-clamp-2">Đam mê phát triển sản phẩm sáng tạo, giao diện cao cấp kết hợp các giải pháp clean code tối ưu trải nghiệm người dùng.</p>
                            <div className="h-1 w-20 rounded-full" style={{ background: `linear-gradient(to right, ${activePrimary}, ${activeSecondary})` }} />
                        </div>
                    </div>
                );
            case 'projects':
                return (
                    <div className="border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 bg-white dark:bg-gray-950 relative overflow-hidden h-56 flex items-center justify-center transition-all duration-300 shadow-inner">
                        <div className="w-56 bg-gray-50 dark:bg-gray-900/60 p-4 rounded-xl border transition-all duration-300 shadow-md flex flex-col gap-2.5" style={{ borderColor: `${activePrimary}30` }}>
                            <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg relative overflow-hidden">
                                <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[8px] font-black text-white shadow" style={{ background: `linear-gradient(135deg, ${activePrimary}, ${activeSecondary})` }}>Được yêu thích</span>
                            </div>
                            <h5 className="text-xs font-bold text-gray-900 dark:text-white">Hệ thống Portfolio SaaS</h5>
                            <div className="flex gap-1.5">
                                <span className="text-[8px] px-1.5 py-0.5 rounded bg-gray-200/60 dark:bg-gray-800 text-gray-500 dark:text-gray-400">Next.js</span>
                                <span className="text-[8px] px-1.5 py-0.5 rounded bg-gray-200/60 dark:bg-gray-800 text-gray-500 dark:text-gray-400">NodeJS</span>
                            </div>
                        </div>
                    </div>
                );
            case 'skills':
                return (
                    <div className="border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 bg-white dark:bg-gray-950 relative overflow-hidden h-56 flex flex-col justify-center gap-4 transition-all duration-300 shadow-inner">
                        {/* Fake progress bar */}
                        <div className="space-y-1.5 max-w-xs mx-auto w-full">
                            <div className="flex justify-between text-[10px] font-bold text-gray-700 dark:text-gray-300">
                                <span>React & Frontend Architecture</span>
                                <span style={{ color: activePrimary }}>95%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-1000" style={{ width: '95%', background: `linear-gradient(to right, ${activePrimary}, ${activeSecondary})` }} />
                            </div>
                        </div>
                        {/* Badges preview */}
                        <div className="flex gap-2 justify-center flex-wrap">
                            <span className="px-2.5 py-1 rounded-lg text-[9px] font-bold border transition-colors bg-gray-50 dark:bg-gray-900/30" style={{ borderColor: `${activePrimary}40`, color: activePrimary }}>JavaScript</span>
                            <span className="px-2.5 py-1 rounded-lg text-[9px] font-bold border transition-colors bg-gray-50 dark:bg-gray-900/30" style={{ borderColor: `${activeSecondary}40`, color: activeSecondary }}>TailwindCSS</span>
                        </div>
                    </div>
                );
            case 'experience':
                return (
                    <div className="border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 bg-white dark:bg-gray-950 relative overflow-hidden h-56 flex flex-col justify-center transition-all duration-300 shadow-inner">
                        <div className="flex gap-3.5 max-w-xs mx-auto">
                            {/* Track line and dot */}
                            <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full flex items-center justify-center border-2 shadow" style={{ borderColor: activePrimary, backgroundColor: `${activePrimary}20` }}>
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activePrimary }} />
                                </div>
                                <div className="w-0.5 flex-grow bg-gray-200 dark:bg-gray-800 mt-1" />
                            </div>
                            {/* Content mock */}
                            <div className="space-y-1 pb-4">
                                <span className="text-[9px] font-bold" style={{ color: activeSecondary }}>2024 - Hiện tại</span>
                                <h5 className="text-xs font-bold text-gray-900 dark:text-white">Trưởng nhóm kỹ thuật</h5>
                                <p className="text-[10px] text-gray-500">QuyenDev Corp</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (isLoading && !userId) {
        return <LoadingSpinner text="Đang tải cấu hình tông màu..." />;
    }

    if (error) {
        return <ErrorCard statusCode={error.status} message={error.message} onRetry={fetchSettings} />;
    }

    return (
        <div className="min-h-full flex flex-col">
            <AdminHeader title="Cấu hình Giao diện">
                <Button onClick={handleSave} isLoading={isLoading}>Lưu Cài Đặt</Button>
            </AdminHeader>

            <div className="flex-grow p-4 md:p-8 pt-2">
                <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/50 dark:border-gray-800/50 shadow-xl transition-colors duration-300 flex flex-col lg:flex-row gap-8">
                    
                    {/* Left Column: Sidebar Tabs with Live Color Indicator Circles */}
                    <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-2.5">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 border-b border-gray-200/50 dark:border-gray-800/50 pb-2">Danh sách Phân vùng</h3>
                        
                        {TABS.map((tab) => {
                            const isSelected = activeTabId === tab.id;
                            const TabIcon = tab.icon;
                            const tabPrimary = theme[tab.primaryKey] || tab.defaultPrimary;
                            const tabSecondary = theme[tab.secondaryKey] || tab.defaultSecondary;

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTabId(tab.id)}
                                    className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl border text-left transition-all duration-300 group ${
                                        isSelected 
                                            ? 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-500/50 text-blue-600 dark:text-blue-400 shadow-md shadow-blue-500/5' 
                                            : 'bg-white/30 dark:bg-gray-900/20 hover:bg-white/80 dark:hover:bg-gray-900/80 border-gray-200/40 dark:border-gray-800/40 text-gray-600 dark:text-gray-400'
                                    }`}
                                >
                                    <div className={`p-2 rounded-xl border transition-all duration-300 ${
                                        isSelected 
                                            ? 'bg-blue-500 text-white border-transparent' 
                                            : 'bg-gray-100 dark:bg-gray-900 text-gray-400 border-gray-200 dark:border-gray-800 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                                    }`}>
                                        <TabIcon size={14} />
                                    </div>
                                    
                                    <div className="flex-grow overflow-hidden pr-2">
                                        <h4 className="text-sm font-bold truncate leading-snug">{tab.label}</h4>
                                    </div>

                                    {/* Color Indicator Pills / Circular Previews next to label */}
                                    <div className="flex items-center gap-1 flex-shrink-0 ml-auto bg-gray-100/50 dark:bg-gray-950/40 p-1.5 rounded-full border border-gray-200/20">
                                        <span 
                                            className="w-3 h-3 rounded-full border border-white/20 shadow-sm block" 
                                            style={{ backgroundColor: tabPrimary }} 
                                            title={`Màu chính: ${tabPrimary}`}
                                        />
                                        <span 
                                            className="w-3 h-3 rounded-full border border-white/20 shadow-sm block" 
                                            style={{ backgroundColor: tabSecondary }} 
                                            title={`Màu phụ: ${tabSecondary}`}
                                        />
                                    </div>

                                    <FaChevronRight size={10} className={`text-gray-300 dark:text-gray-700 transition-transform ${isSelected ? 'translate-x-0.5 text-blue-400' : 'group-hover:translate-x-0.5'}`} />
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Column: Active Tab Customizer & Live Visual Mockup Preview */}
                    <div className="flex-grow space-y-6">
                        <div className="bg-gray-50/50 dark:bg-gray-950/20 border border-gray-200/40 dark:border-gray-800/40 rounded-2xl p-6 md:p-8 space-y-6">
                            <div>
                                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2.5">
                                    <span style={{ color: activePrimary }}>{activeTab.label}</span>
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">{activeTab.desc}</p>
                            </div>

                            {/* Hex inputs and Color pickers side by side */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-gray-100 dark:border-gray-900">
                                {/* Primary Color Card */}
                                <div className="space-y-2.5">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Màu chủ đạo (Primary)</label>
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm group">
                                            <input 
                                                type="color" 
                                                value={activePrimary} 
                                                onChange={(e) => setTheme({...theme, [activeTab.primaryKey]: e.target.value})}
                                                className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                                            />
                                        </div>
                                        <Input 
                                            value={activePrimary} 
                                            onChange={(e) => setTheme({...theme, [activeTab.primaryKey]: e.target.value})}
                                            className="flex-grow font-mono"
                                        />
                                    </div>
                                </div>

                                {/* Secondary Color Card */}
                                <div className="space-y-2.5">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Màu nhấn phụ (Secondary)</label>
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm group">
                                            <input 
                                                type="color" 
                                                value={activeSecondary} 
                                                onChange={(e) => setTheme({...theme, [activeTab.secondaryKey]: e.target.value})}
                                                className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                                            />
                                        </div>
                                        <Input 
                                            value={activeSecondary} 
                                            onChange={(e) => setTheme({...theme, [activeTab.secondaryKey]: e.target.value})}
                                            className="flex-grow font-mono"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Live UI Mockup Preview Component */}
                        <div className="border border-gray-200/50 dark:border-gray-800/50 rounded-3xl p-6 bg-white/20 dark:bg-gray-900/10 space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-2">
                                <FaEye size={12} /> Preview hiển thị thực tế (Live UI Mockup)
                            </h4>
                            {renderLiveMockPreview()}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SettingsManager;
