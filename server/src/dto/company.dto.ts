import { IsString } from 'class-validator';

export default class CompanyDTO {
	@IsString()
	name: string;
}
