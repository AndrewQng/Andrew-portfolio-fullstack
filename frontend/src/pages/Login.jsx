import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginAPI } from '../services/authService';

const Login = () => {
    const { login } = useContext(AuthContext); // Lấy hàm login từ Context ông đã tạo hôm trước
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Gọi API đăng nhập
            const data = await loginAPI(username, password);
            
            // Thành công thì lưu token vào Context & LocalStorage
            login(data.token);
            
            // Ở đây ông có thể dùng react-router-dom để redirect về trang Admin
            alert('Đăng nhập thành công! Xin chào ' + data.username);
            
        } catch (err) {
            // Hiển thị lỗi nếu sai tài khoản/mật khẩu
            setError(err.response?.data?.error || 'Đăng nhập thất bại, vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Đăng nhập hệ thống</h2>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Tài khoản:</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Mật khẩu:</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={isLoading}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: isLoading ? 'not-allowed' : 'pointer' }}
                >
                    {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                </button>
            </form>
        </div>
    );
};

export default Login;