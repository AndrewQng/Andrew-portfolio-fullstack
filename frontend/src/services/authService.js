import apiClient from './apiClient';

export const loginAPI = async (username, password) => {
    const response = await apiClient.post('/auth/login', {
        username,
        password
    });
    return response.data; // Trả về cục JSON ông vừa gửi tôi đấy
};

export const logoutAPI = async () => {
    await apiClient.post('/auth/logout');
};