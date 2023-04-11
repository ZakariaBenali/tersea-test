import { Repository } from 'typeorm';
import { History } from '../entities';
import { dataSource } from '../data-source';
import { historyAction } from '../entities/history.entity';

export class HistoryService {
	public repository: Repository<History>;

	constructor() {
		this.repository = dataSource.getRepository(History);
	}

	async store(userId: number, invitationId: string, action: historyAction) {
		return this.repository.create(new History(userId, invitationId, action)).save();
	}

	async getAll() {
		return this.repository.find({
			relations: ['user', 'invitation', 'invitation.company'],
		});
	}
}
