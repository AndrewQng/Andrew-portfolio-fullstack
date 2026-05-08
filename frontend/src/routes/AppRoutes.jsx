import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx'; // Lùi 1 cấp

import Home from '../pages/Home.jsx'; // Lùi 1 cấp
import Login from '../pages/Login.jsx';
import UsersPage from '../pages/AdminDashboard.jsx';

const AppRoutes = () => {
    const { user } = useContext(AuthContext);

    return (
        <Router>
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
        </Router>
    );
};

export default AppRoutes;