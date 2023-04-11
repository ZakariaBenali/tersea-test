import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

const FormError: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...rest }) => {
	return (
		<div className={clsx('bg-error/80 text-white p-3 mb-4 rounded', className)} {...rest}>
			{children}
		</div>
	);
};

export { FormError };
