import apiClient from './apiClient';

export const getAllProjects = async () => {
    const response = await apiClient.get('/projects');
    return response.data;
};

export const createProject = async (projectData) => {
    const response = await apiClient.post('/projects', projectData);
    return response.data;
};

export const updateProject = async (id, projectData) => {
    const response = await apiClient.put(`/projects/${id}`, projectData);
    return response.data;
};

// ĐÂY LÀ HÀM ÔNG ĐANG THIẾU:
export const deleteProject = async (id) => {
    const response = await apiClient.delete(`/projects/${id}`);
    return response.data;
};