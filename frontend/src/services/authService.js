import apiClient from './apiClient';

export const loginAPI = async (username, password) => {
    const response = await apiClient.post('/auth/login', {
        username,
        password
    });
    return response.data; // Trả về cục JSON ông vừa gửi tôi đấy
};

export const refreshAPI = async () => {
    // Không cần gửi body, backend tự lấy HttpOnly cookie 'portfolio_rt'
    const response = await apiClient.post('/auth/refresh');
    return response.data;
};

export const logoutAPI = async () => {
    await apiClient.post('/auth/logout');
};