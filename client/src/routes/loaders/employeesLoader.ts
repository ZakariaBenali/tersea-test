import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { sortingType } from 'components/Filters';
import { getAllEmployees } from 'services/employee';
import { redirect } from 'react-router-dom';

export const employeesQuery = () => ({
	queryKey: ['invitations'],
	queryFn: async (sorted?: sortingType, name?: string) => getAllEmployees(sorted, name),
});

export const employeesLoader = (queryClient: QueryClient) => {
	return async () => {
		try {
			const query = employeesQuery();
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
