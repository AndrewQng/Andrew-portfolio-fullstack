import apiClient from './apiClient';

export const getUserProfile = async () => {
    try {
        // Gọi xuống Backend để lấy Profile của user 'admin'
        // Tùy vào route Backend của ông, có thể là '/users/profile' hoặc '/users'
        const response = await apiClient.get('/users/profile'); 
        
        // Nếu API trả về một mảng users, ta lấy user đầu tiên
        if (Array.isArray(response.data)) {
            return response.data[0];
        }
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getUserProfile:", error);
        throw error;
    }
};

export const updateUserProfile = async (id, data) => {
    const response = await apiClient.put(`/users/${id}`, data);
    return response.data;
};