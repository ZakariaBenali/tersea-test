import { QueryClient } from '@tanstack/react-query';
import { Params } from 'react-router-dom';
import { getSingleInvitation } from 'services/invitation';

export const registerQuery = (id: string) => ({
	queryKey: ['register', id],
	queryFn: async () => getSingleInvitation(id),
});

export const registerLoader = (queryClient: QueryClient) => {
	return async ({ params }: { params: Params }) => {
		if (!params.id) {
			throw new Error('Invitation id  is required');
		}
		const query = registerQuery(params.id);
		return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
	};
};
