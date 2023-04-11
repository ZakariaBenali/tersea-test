import { User } from 'types/User';
import { axiosInstance } from './axiosInstance';
import { SuccessResponse } from 'types/Response';

export const login = async (email: string, password: string) => {
	return await axiosInstance.post('/login', {
		email,
		password,
	});
};

export const getAuthUser = async () => {
	return await axiosInstance.get<SuccessResponse<User>>('/user/me');
};

export const updateProfile = async (name: string, password: string) => {
	return await axiosInstance.put('/user/profile', {
		name,
		password,
	});
};
