import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { sortingType } from 'components/Filters';
import { redirect } from 'react-router-dom';
import { getAllCompanies } from 'services/company';

export const companiesQuery = () => ({
	queryKey: ['companies'],
	queryFn: async (sorted?: sortingType, name?: string) => getAllCompanies(sorted, name),
});

export const companiesLoader = (queryClient: QueryClient) => {
	return async () => {
		try {
			const query = companiesQuery();
			return (
				queryClient.getQueryData(query.queryKey) ??
				(await queryClient.fetchQuery(query.queryKey, () => query.queryFn()))
			);
		} catch (err) {
			if ((err as AxiosError).response?.status === 401) {
				return redirect('/login');
			}
		}
	};
};
