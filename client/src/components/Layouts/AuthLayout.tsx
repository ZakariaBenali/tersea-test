import { useQuery } from '@tanstack/react-query';
import { Loading } from 'components/Loading';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAuthUser } from 'services/auth';

const AuthLayout = () => {
	const navigate = useNavigate();
	const query = useQuery(['auth-user'], getAuthUser, {
		cacheTime: Infinity,
		retry: false,
		onSuccess: () => {
			navigate('/');
		},
	});

	if (query.isLoading) {
		return <Loading />;
	}

	return (
		<main className="h-screen">
			<div className="container h-full flex items-center justify-center p-8">
				<Outlet />
			</div>
		</main>
	);
};

export { AuthLayout };
