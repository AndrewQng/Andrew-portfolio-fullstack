import apiClient from './apiClient';

export const getAllCertifications = async () => {
    const response = await apiClient.get('/certifications');
    return response.data;
};

export const createCertification = async (data) => {
    const response = await apiClient.post('/certifications', data);
    return response.data;
};

export const updateCertification = async (id, data) => {
    const response = await apiClient.put(`/certifications/${id}`, data);
    return response.data;
};

export const deleteCertification = async (id) => {
    const response = await apiClient.delete(`/certifications/${id}`);
    return response.data;
};