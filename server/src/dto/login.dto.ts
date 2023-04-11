import { IsEmail, IsString } from 'class-validator';

export default class LoginDTO {
	@IsEmail(
		{},
		{
			message: 'Invalid email',
		},
	)
	email: string;

	@IsString()
	password: string;
}
