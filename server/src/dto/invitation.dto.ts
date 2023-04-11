import { IsEmail, IsString } from 'class-validator';

export default class InvitationDTO {
	@IsString({ message: 'Please provide a valid name' })
	name: string;
	@IsEmail({}, { message: 'Please provide a valid email' })
	email: string;
}
