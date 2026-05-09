import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import { ThemeContext } from '../../context/ThemeContext.jsx';
import { FaProjectDiagram, FaCode, FaUserTie, FaSignOutAlt, FaCog, FaSun, FaMoon, FaBars, FaTimes, FaCertificate } from 'react-icons/fa';
import AdminSidebarTab from '../admin/AdminSidebarTab.jsx';

const AdminLayout = ({ children, activeTab, setActiveTab }) => {
    const { logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { id: 'projects', icon: <FaProjectDiagram />, label: 'Quản lý Dự án' },
        { id: 'skills', icon: <FaCode />, label: 'Quản lý Kỹ năng' },
        { id: 'profile', icon: <FaUserTie />, label: 'Hồ sơ Cá nhân' },
        { id: 'certifications', icon: <FaCertificate />, label: 'Quản lý Chứng chỉ' },
        { id: 'settings', icon: <FaCog />, label: 'Cài đặt Website' },
    ];

    return (
        <div className="flex h-screen overflow-hidden text-gray-900 dark:text-white transition-colors duration-300 relative z-10 bg-transparent">
            {/* Overlay cho Mobile */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" 
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-white/50 dark:border-gray-800/50 flex flex-col transition-transform duration-300 shadow-2xl md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Header Sidebar */}
                <div className="p-6 border-b border-white/50 dark:border-gray-800/50 flex justify-between items-center transition-colors duration-300">
                    <Link to="/" className="text-2xl font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors flex items-center gap-2" title="Về trang chủ">
                        Home
                    </Link>
                    <div className="flex items-center gap-2">
                        {/* Toggle Light/Dark Mode */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors hidden md:block"
                            aria-label="Toggle Dark Mode"
                        >
                            {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
                        </button>
                        {/* Close Button on Mobile */}
                        <button
                            className="md:hidden p-2 text-gray-600 dark:text-gray-300"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <AdminSidebarTab
                            key={item.id}
                            id={item.id}
                            label={item.label}
                            icon={item.icon}
                            isActive={activeTab === item.id}
                            onClick={(id) => {
                                setActiveTab(id);
                                setIsMobileMenuOpen(false); // Đóng menu khi chọn (trên mobile)
                            }}
                        />
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <FaSignOutAlt />
                        <span>Đăng xuất</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 w-full">
                {/* Mobile Header (Hamburger) */}
                <div className="md:hidden flex items-center justify-between p-4 border-b border-white/50 dark:border-gray-800/50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-600 dark:text-gray-300">
                        <FaBars size={24} />
                    </button>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                    >
                        {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto transition-colors duration-300">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;