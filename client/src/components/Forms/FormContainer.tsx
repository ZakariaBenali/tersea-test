import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
	title?: string;
}

const FormContainer: FC<Props> = ({ title, className, children, ...rest }) => {
	return (
		<div
			className={clsx('relative w-full max-w-lg p-8 bg-white rounded-lg shadow-2xl md:p-10 shadow-gray/30', className)}
			{...rest}
		>
			{title && <h1 className="text-3xl font-bold mb-8">{title}</h1>}
			{children}
		</div>
	);
};

export { FormContainer };
