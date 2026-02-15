import api from './api';

const register = (userData) => {
    return api.post('/auth/register', userData);
};

const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data; // This returns the token from Spring Boot
};

const getCurrentUser = () => {
    return api.get('/user/me');
};

const logout = () => {
    localStorage.removeItem('token');
};

export default { register, login, getCurrentUser, logout };