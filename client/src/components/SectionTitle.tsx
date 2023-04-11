import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';
import { ReactComponent as Spinner } from 'assets/spinner.svg';

interface Props {
	title: string;
	className?: string;
	isLoading?: boolean;
}

const SectionTitle: FC<PropsWithChildren<Props>> = ({ title, isLoading, className, children }) => {
	return (
		<div className={clsx('mb-6', className)}>
			<h3 className="font-bold text-2xl text-primary-800 flex items-center">
				{title}
				{isLoading && <Spinner className="animate-spin h-5 ml-2" />}
			</h3>
			{children}
		</div>
	);
};

export { SectionTitle };
