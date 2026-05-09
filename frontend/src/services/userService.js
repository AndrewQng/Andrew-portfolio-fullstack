import apiClient from './apiClient';

let profilePromise = null;

export const clearProfileCache = () => {
    profilePromise = null;
};

export const getUserProfile = async () => {
    if (profilePromise) {
        return profilePromise;
    }

    profilePromise = (async () => {
        try {
            // Gọi xuống Backend để lấy Profile của user 'admin'
            const response = await apiClient.get('/users/profile'); 
            
            // Nếu API trả về một mảng users, ta lấy user đầu tiên
            if (Array.isArray(response.data)) {
                return response.data[0];
            }
            return response.data;
        } catch (error) {
            console.error("Lỗi khi gọi API getUserProfile:", error);
            profilePromise = null; // Clear cache on error to allow retry
            throw error;
        }
    })();

    return profilePromise;
};

export const updateUserProfile = async (id, data) => {
    const response = await apiClient.put(`/users/${id}`, data);
    clearProfileCache(); // Clear cache khi cap nhat de lan sau fetch du lieu moi
    return response.data;
};