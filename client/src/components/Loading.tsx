import { ReactComponent as Spinner } from 'assets/spinner.svg';
const Loading = () => {
	return (
		<div className="h-screen w-screen bg-white fixed top-0 left-0 z-50 flex items-center justify-center">
			<Spinner className="animate-spin h-10" />
		</div>
	);
};

export { Loading };
