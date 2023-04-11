import { History, historyAction } from 'types/History';

export const formatHistory = (history: History) => {
	const { user, invitation } = history;
	switch (history.action) {
		case historyAction.created:
			return `Admin "${user.name}" a invite l'employé "${invitation.name}" à joindre la société "${invitation.company.name}"”"`;
		case historyAction.approved:
			return `"${invitation.name}" à valider l'invitation`;
		case historyAction.canceled:
			return `Admin "${user.name}" à annuler l'invitation`;
	}
};
