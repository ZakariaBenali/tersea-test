import { useQuery } from '@tanstack/react-query';
import { Navbar } from 'components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAuthUser } from 'services/auth';
import { useSetRecoilState } from 'recoil';
import { userAtom } from 'state/atoms/userAtom';
import { Loading } from 'components/Loading';
import { AxiosError } from 'axios';

const AppLayout = () => {
	const setUser = useSetRecoilState(userAtom);
	const navigate = useNavigate();
	const query = useQuery(['auth-user'], getAuthUser, {
		cacheTime: Infinity,
		retry: false,
		onSuccess: (response) => {
			const { data } = response;
			setUser(data.data);
		},
		onError: (err) => {
			if ((err as AxiosError).response?.status === 401) {
				navigate('/login');
			}
		},
	});

	if (query.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Navbar />
			<main className="pt-12">
				<Outlet />
			</main>
		</>
	);
};

export { AppLayout };
