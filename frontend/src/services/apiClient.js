import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

let memoryToken = null;

export const setToken = (token) => {
    memoryToken = token;
};

apiClient.interceptors.request.use(
    (config) => {
        // Luôn gửi kèm HttpOnly Cookie
        config.withCredentials = true;

        // Nếu có Token trong RAM thì gửi lên header
        if (memoryToken) {
            config.headers.Authorization = `Bearer ${memoryToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;