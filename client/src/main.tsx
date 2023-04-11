import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/tailwind.css';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { initializeQueryClient } from 'lib/tanstackClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { RecoilRoot } from 'recoil';
dayjs.locale('fr');

const queryClient = initializeQueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<RecoilRoot>
				<RouterProvider router={router} />
			</RecoilRoot>
		</QueryClientProvider>
	</React.StrictMode>,
);
