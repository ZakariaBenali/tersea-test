import { IsString } from 'class-validator';

export default class ProfileDTO {
	@IsString()
	name: string;
	@IsString({ message: 'Password is required' })
	password: string;
}
