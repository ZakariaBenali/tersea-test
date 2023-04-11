import { axiosInstance } from './axiosInstance';
import { SuccessResponse } from 'types/Response';
import { Invitation } from 'types/Invitation';

export const getAllInvitation = async () => {
	return await axiosInstance.get<SuccessResponse<Invitation[]>>('/invitation/all');
};

export const cancelInvitation = async (id: string) => {
	return await axiosInstance.put(`/invitation/update/${id}`);
};

export const createInvitation = async (companyId: string, name: string, email: string) => {
	return await axiosInstance.post(`/invitation/store/${companyId}`, {
		email,
		name,
	});
};

export const getSingleInvitation = async (id: string) => {
	return await axiosInstance.get<SuccessResponse<Invitation>>(`/invitation/${id}`);
};
