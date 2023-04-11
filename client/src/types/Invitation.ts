import { Company } from './Company';

export type invitationStatus = 'confirmed' | 'pending' | 'canceled';

export interface Invitation {
	name: string;
	email: string;
	companyId: number;
	id: string;
	status: invitationStatus;
	createdAt: string;
	company: Company;
}
