import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { FaProjectDiagram, FaCode, FaUserTie, FaSignOutAlt } from 'react-icons/fa';

const AdminLayout = ({ children, activeTab, setActiveTab }) => {
    const { logout } = useContext(AuthContext);

    const menuItems = [
        { id: 'projects', icon: <FaProjectDiagram />, label: 'Quản lý Dự án' },
        { id: 'skills', icon: <FaCode />, label: 'Quản lý Kỹ năng' },
        { id: 'profile', icon: <FaUserTie />, label: 'Hồ sơ Cá nhân' },
    ];

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-blue-500">Admin Panel</h2>
                </div>
                
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                activeTab === item.id 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button 
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <FaSignOutAlt />
                        <span>Đăng xuất</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-8 bg-gray-900">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;