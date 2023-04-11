import { ButtonHTMLAttributes, FC } from 'react';
import { ButtonStyle, ButtonStyleProps } from './ButtonStyle';
import { ReactComponent as Spinner } from 'assets/spinner.svg';
import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleProps {
	isLoading?: boolean;
}

const Button: FC<Props> = ({ children, isLoading, buttonType, secondary, isSmall, disabled, className, ...rest }) => {
	return (
		<button {...rest} disabled={disabled || isLoading} className={clsx('relative', className)}>
			{isLoading && (
				<div
					className={clsx('flex items-center justify-center absolute w-full h-full left-0 top-0 rounded-lg', {
						className,
						'bg-primary-500': buttonType === 'primary',
						'bg-error': buttonType === 'danger',
					})}
				>
					<Spinner className="animate-spin h-5 w-5 text-white" />
				</div>
			)}
			<ButtonStyle buttonType={buttonType} isSmall={isSmall} secondary={secondary}>
				{children}
			</ButtonStyle>
		</button>
	);
};

Button.defaultProps = {
	buttonType: 'primary',
};

export { Button };
