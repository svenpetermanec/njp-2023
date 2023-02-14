import axios, { AxiosRequestHeaders } from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

axios.interceptors.request.use((config) => {
    config.headers = {
        Authorization: `${localStorage.getItem('jwt')}`,
    } as AxiosRequestHeaders;
    return config;
});

export default axios;
