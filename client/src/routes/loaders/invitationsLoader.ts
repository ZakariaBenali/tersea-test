import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { redirect } from 'react-router-dom';
import { getAllInvitation } from 'services/invitation';

export const invitationsQuery = () => ({
	queryKey: ['invitations'],
	queryFn: async () => getAllInvitation(),
});

export const invitationsLoader = (queryClient: QueryClient) => {
	return async () => {
		const query = invitationsQuery();
		try {
			return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
		} catch (err) {
			if ((err as AxiosError).response?.status === 401) {
				return redirect('/login');
			}
		}
	};
};
