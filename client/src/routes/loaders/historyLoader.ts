import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { redirect } from 'react-router-dom';
import { getallHistory } from 'services/history';

export const historyQuery = () => ({
	queryKey: ['history'],
	queryFn: async () => getallHistory(),
});

export const historyLoader = (queryClient: QueryClient) => {
	return async () => {
		try {
			const query = historyQuery();
			return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
		} catch (err) {
			if ((err as AxiosError).response?.status === 401) {
				return redirect('/login');
			}
		}
	};
};
