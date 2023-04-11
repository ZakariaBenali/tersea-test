import { Invitation } from './Invitation';
import { User } from './User';
export enum historyAction {
	created = 'created',
	canceled = 'canceled',
	approved = 'approved',
}

export interface History {
	userId: number;
	invitationId: string;
	action: string;
	id: number;
	createdAt: string;
	updatedAt: string;
	user: User;
	invitation: Invitation;
}
