import { FC } from 'react';
import Logo from 'assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userAtom } from 'state/atoms/userAtom';
import { Button } from './Buttons/Button';
import { ButtonStyle } from './Buttons/ButtonStyle';
import { destroyToken } from 'utils/token';

const Navbar: FC = () => {
	const user = useRecoilValue(userAtom);
	const resetUser = useResetRecoilState(userAtom);
	const navigate = useNavigate();
	const handleLogout = () => {
		destroyToken();
		resetUser();
		navigate('/login');
	};
	return (
		<header className="h-24 bg-white shadow-sm">
			<div className="container h-full flex items-center">
				<img src={Logo} alt="Website logo" />
				<nav className="ml-auto mr-10">
					<ul className="flex gap-6">
						{user?.isAdmin && (
							<>
								<li>
									<Link to="/companies">Sociétés</Link>
								</li>
								<li>
									<Link to="/invitations">Invitations</Link>
								</li>
								<li>
									<Link to="/">Employés</Link>
								</li>
								<li>
									<Link to="/history">Historique</Link>
								</li>
							</>
						)}
						<li>
							<Link to="/profile">Profil</Link>
						</li>
					</ul>
				</nav>

				<div className="flex">
					{user?.isAdmin && (
						<Link to="/create/admin" className="mr-4">
							<ButtonStyle>Créer un admin</ButtonStyle>
						</Link>
					)}
					<Button onClick={() => handleLogout()} secondary>
						Déconnexion
					</Button>
				</div>
			</div>
		</header>
	);
};

export { Navbar };
