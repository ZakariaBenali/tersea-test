import { Invitation } from 'types/Invitation';

export const formatInvitationStatus = (invitation: Invitation) => {
	switch (invitation.status) {
		case 'pending':
			return 'en cours';
		case 'confirmed':
			return 'confirmé';
		case 'canceled':
			return 'annulé';
	}
};
