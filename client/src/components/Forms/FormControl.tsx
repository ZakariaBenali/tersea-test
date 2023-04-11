import { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

export interface FormControlProps {
	error?: string;
}

const FormControl: FC<FormControlProps & HTMLAttributes<HTMLDivElement>> = ({
	children,
	error,
	className,
	...rest
}) => {
	return (
		<div>
			<div
				className={clsx('relative transition bg-gray-100  rounded-lg border-2 border-gray/20', className, {
					'!border-error': error,
				})}
				{...rest}
			>
				{children}
			</div>
			{error && <small className="text-error">{error}</small>}
		</div>
	);
};

export { FormControl };
