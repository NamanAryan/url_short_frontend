import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const authAxios = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
  });
  
authAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export const shortenUrl = async (url) => {
    try {
        const response = await axios.post(`${API_URL}/shorten`, { url });
        return response.data;
    } catch (error) {
        return error.response.data;
        
    }
}

export const allUrls = async () => {
    try {
        const response = await axios.get(`${API_URL}/urls`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}