import clsx from 'clsx';
import { FC, InputHTMLAttributes } from 'react';

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ className, disabled, ...rest }) => {
	return (
		<input
			className={clsx('w-full py-4 pl-4 bg-transparent outline-none rounded-lg', className, {
				'bg-gray/10 text-gray': disabled,
			})}
			{...rest}
			disabled={disabled}
		/>
	);
};

export { Input };
