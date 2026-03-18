import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authApi = {
    getProfile: () => api.get('/auth/profile'),
    updateApiKey: (geminiApiKey: string) => api.put('/auth/update-key', { geminiApiKey }),
};

export const repoApi = {
    importRepo: (url: string) => api.post('/repos/import', { url }),
    getAllRepos: () => api.get('/repos'),
    getRepo: (id: string) => api.get(`/repos/${id}`),
    getAllExplanations: (id: string) => api.get(`/repos/${id}/explanations`),
    getExplanation: (id: string, path: string) =>
        api.get(`/repos/${id}/explanation`, { params: { path } }),
    getFileContent: (id: string, path: string) =>
        api.get(`/repos/${id}/file`, { params: { path } }),
    getFileExplanation: (id: string, path: string) =>
        api.get(`/repos/${id}/file-explanation`, { params: { path } }),
    deleteRepo: (id: string) => api.delete(`/repos/${id}`),
};

export default api;
