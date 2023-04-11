import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

const FormSuccess: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...rest }) => {
	return (
		<div className={clsx('bg-success text-white p-3 mb-4 rounded', className)} {...rest}>
			{children}
		</div>
	);
};

export { FormSuccess };
