import { axiosInstance } from './axiosInstance';
import { SuccessResponse } from 'types/Response';
import { Company } from 'types/Company';

export const getAllCompanies = async (sort = 'ASC', name?: string) => {
	const params = new URLSearchParams({
		...(name && {
			name,
		}),
		sort,
	}).toString();
	const url = '/company/all?' + params;
	return await axiosInstance.get<SuccessResponse<Company[]>>(url);
};

export const deleteCompany = async (id: number) => {
	return await axiosInstance.delete(`/company/delete/${id}`);
};

export const createCompany = async (name: string) => {
	return await axiosInstance.post(`/company/store`, {
		name,
	});
};
