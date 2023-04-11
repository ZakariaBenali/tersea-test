import { Company } from './Company';

export interface User {
	name: string;
	email: string;
	isAdmin: boolean;
	id: number;
	createdAt: string;
	company?: Company;
}
