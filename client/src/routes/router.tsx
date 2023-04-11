import { AppLayout } from 'components/Layouts/AppLayout';
import { initializeQueryClient } from 'lib/tanstackClient';
import { Companies } from 'pages/Companies';
import { Employees } from 'pages/Employees';
import { Invitations } from 'pages/Invitations';
import { Login } from 'pages/Login';
import { createBrowserRouter } from 'react-router-dom';
import { companiesLoader } from './loaders/companiesLoader';
import { invitationsLoader } from './loaders/invitationsLoader';
import { Profile } from 'pages/Profile';
import { employeesLoader } from './loaders/employeesLoader';
import { CreateCompany } from 'pages/CreateCompany';
import { InviteToCompany } from 'pages/InviteToCompany';
import { Register } from 'pages/Register';
import { AuthLayout } from 'components/Layouts/AuthLayout';
import { CreateAdmin } from 'pages/CreateAdmin';
import { historyLoader } from './loaders/historyLoader';
import { History } from 'pages/History';
const queryClient = initializeQueryClient();

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				path: '/companies',
				children: [
					{
						path: '',
						loader: companiesLoader(queryClient),
						element: <Companies />,
					},
					{
						path: 'create',
						element: <CreateCompany />,
					},
					{
						path: 'invite/:id',
						element: <InviteToCompany />,
					},
				],
			},
			{
				path: '/invitations',
				loader: invitationsLoader(queryClient),
				element: <Invitations />,
			},
			{
				path: '',
				loader: employeesLoader(queryClient),
				element: <Employees />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
			{
				path: '/create/admin',
				element: <CreateAdmin />,
			},
			{
				path: '/history',
				loader: historyLoader(queryClient),
				element: <History />,
			},
		],
	},
	{
		path: '/',
		element: <AuthLayout />,
		children: [
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/register/:id',
				element: <Register />,
			},
		],
	},
]);
