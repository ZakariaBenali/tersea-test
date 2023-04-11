import axios from 'axios';
import { getToken } from 'utils/token';

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
	const token = getToken();
	config.headers.Authorization = token ? `Bearer ${token}` : '';
	return config;
});
