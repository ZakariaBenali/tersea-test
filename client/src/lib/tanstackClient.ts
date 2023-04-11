import { QueryClient } from '@tanstack/react-query';

let queryClient: QueryClient;

export function initializeQueryClient() {
	if (!queryClient) {
		queryClient = new QueryClient();
	}
	return queryClient;
}
