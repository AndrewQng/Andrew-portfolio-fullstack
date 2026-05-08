import apiClient from './apiClient';

export const getAllSkills = async () => {
    const response = await apiClient.get('/skills');
    return response.data;
};

export const createSkill = async (skillData) => {
    const response = await apiClient.post('/skills', skillData);
    return response.data;
};

export const deleteSkill = async (id) => {
    const response = await apiClient.delete(`/skills/${id}`);
    return response.data;
};