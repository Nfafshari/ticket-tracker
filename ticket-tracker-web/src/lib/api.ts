import axios from 'axios';

// set our api endpoint location
const api = axios.create({
    baseURL: 'http:/localhost:8080/api',
});

// run before every request using interceptor and attach the header
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;