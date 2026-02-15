import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Interceptor to attach the token with the mandatory "Bearer " prefix
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        // Ensure the header name is exactly 'Authorization'
        config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
});

export default api;