import { createContext, useState, useEffect } from 'react';
import { setToken } from '../services/apiClient';
import { refreshAPI } from '../services/authService';
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            // Xóa token cũ còn sót (nếu có từ phiên bản trước)
            localStorage.removeItem('token');
            try {
                // Tự động gọi refresh token từ HttpOnly Cookie
                const data = await refreshAPI();
                if (data && data.token) {
                    setToken(data.token);
                    setUser({ token: data.token });
                }
            } catch (err) {
                // Nếu không có Cookie hoặc hết hạn -> Chưa đăng nhập
                setToken(null);
                setUser(null);
            } finally {
                setIsAuthLoading(false);
            }
        };
        initAuth();
    }, []);

    const login = (token) => {
        setToken(token);
        setUser({ token });
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    // Chặn render các Route khi đang gọi API Refresh
    if (isAuthLoading) {
        return <LoadingSpinner text="Đang tải phiên làm việc..." fullPage={true} />;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};