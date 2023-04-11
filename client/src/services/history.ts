import { SuccessResponse } from 'types/Response';
import { axiosInstance } from './axiosInstance';
import { History } from 'types/History';

export const getallHistory = async () => {
	return await axiosInstance.get<SuccessResponse<History[]>>('/history/all');
};
