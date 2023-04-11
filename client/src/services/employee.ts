import { axiosInstance } from './axiosInstance';
import { SuccessResponse } from 'types/Response';
import { User } from 'types/User';

export const getAllEmployees = async (sort = 'ASC', name?: string) => {
	const params = new URLSearchParams({
		...(name && {
			name,
		}),
		sort,
	}).toString();
	const url = '/user/all?' + params;
	return await axiosInstance.get<SuccessResponse<User[]>>(url);
};

export const createEmployee = async (invitation_id: string, password: string) => {
	return await axiosInstance.post<SuccessResponse<User[]>>('/user/store', {
		invitation_id,
		password,
	});
};
