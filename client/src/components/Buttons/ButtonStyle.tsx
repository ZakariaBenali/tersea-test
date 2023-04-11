import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

export type ButtonType = 'primary' | 'danger';
export interface ButtonStyleProps {
	buttonType?: ButtonType;
	isSmall?: boolean;
	secondary?: boolean;
}
interface Props extends ButtonStyleProps {
	className?: string;
}

const ButtonStyle: FC<PropsWithChildren<Props>> = ({ className, isSmall, secondary, buttonType, children }) => {
	return (
		<div
			className={clsx(
				'font-semibold  rounded-lg border-2 border-transparent cursor-pointer duration-300 flex-shrink-0 text-white  hover:shadow-lg ',
				{
					className,
					'bg-primary-500 hover:shadow-primary-500/50': buttonType == 'primary',
					'bg-error hover:shadow-error/50': buttonType == 'danger',
					'text-base px-4 py-3': !isSmall,
					'text-xs px-3 py-2': isSmall,
					'border-primary-500 !bg-transparent !text-primary-500': secondary && buttonType == 'primary',
					'border-error !bg-transparent !text-error': secondary && buttonType == 'danger',
				},
			)}
		>
			{children}
		</div>
	);
};

ButtonStyle.defaultProps = {
	buttonType: 'primary',
};

export { ButtonStyle };
