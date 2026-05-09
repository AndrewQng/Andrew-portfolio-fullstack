import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { getUserProfile } from '../services/userService.js';

import Home from '../pages/Home.jsx'; // Lùi 1 cấp
import Login from '../pages/Login.jsx';
import UsersPage from '../pages/AdminDashboard.jsx';

import MouseEffect from '../components/ui/MouseEffect.jsx';

const AppRoutes = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // Tải cấu hình giao diện từ Profile để áp dụng biến màu toàn cục
        const loadTheme = async () => {
            try {
                const profile = await getUserProfile();
                if (profile?.theme) {
                    document.documentElement.style.setProperty('--color-primary', profile.theme.primaryColor || '#3b82f6');
                    document.documentElement.style.setProperty('--color-secondary', profile.theme.secondaryColor || '#9333ea');
                } else {
                    document.documentElement.style.setProperty('--color-primary', '#3b82f6');
                    document.documentElement.style.setProperty('--color-secondary', '#9333ea');
                }
            } catch (err) {
                console.error("Lỗi tải cấu hình website", err);
            }
        };
        loadTheme();
    }, []);

    return (
        <Router>
            <div className="relative min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden bg-gray-50 dark:bg-gray-950">
                <MouseEffect />
                <Routes>
                    {/* Tuyến đường Public */}
                    <Route path="/" element={<Home />} />

                    {/* Tuyến đường Admin */}
                    <Route 
                        path="/admin/login" 
                        element={!user ? <Login /> : <UsersPage />} 
                    />
                    <Route 
                        path="/admin/dashboard" 
                        element={user ? <UsersPage /> : <Login />} 
                    />
                    
                    {/* Sau này ông có thể thêm Route 404 Not Found ở đây */}
                </Routes>
            </div>
        </Router>
    );
};

export default AppRoutes;