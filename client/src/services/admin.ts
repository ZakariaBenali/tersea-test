import { SuccessResponse } from 'types/Response';
import { axiosInstance } from './axiosInstance';
import { User } from 'types/User';

export const createAdmin = async (name: string, email: string, password: string) => {
	return await axiosInstance.post<SuccessResponse<User[]>>('/user/admin/store', {
		name,
		email,
		password,
	});
};
