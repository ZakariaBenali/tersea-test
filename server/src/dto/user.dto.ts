import { IsString } from 'class-validator';

export default class UserDTO {
	@IsString()
	invitation_id: string;
	@IsString({ message: 'Password is required' })
	password: string;
}
