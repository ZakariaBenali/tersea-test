import { IsString, IsEmail } from 'class-validator';

export default class AdminDTO {
	@IsString()
	name: string;

	@IsEmail({}, { message: 'Please provide a valid email' })
	email: string;

	@IsString({ message: 'Password is required' })
	password: string;
}
