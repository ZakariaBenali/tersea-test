import { Repository } from 'typeorm';
import { dataSource } from '../data-source';
import { Invitation } from '../entities';
import { InvitationStatus } from '../entities/invitation.entity';

export class InvitationService {
	public repository: Repository<Invitation>;

	constructor() {
		this.repository = dataSource.getRepository(Invitation);
	}

	async store(name: string, email: string, companyId: string) {
		return await this.repository.create(new Invitation(name, email, companyId)).save();
	}

	async updateStatus(id: string, status: InvitationStatus) {
		return await this.repository.update(id, {
			status: status,
		});
	}

	async getAll() {
		return await this.repository.find();
	}

	async getById(id: string) {
		return await this.repository.findOne({
			where: {
				id: id,
			},
			relations: ['company'],
		});
	}

	async getPendingById(id: string) {
		return await this.repository.findOne({
			where: {
				id: id,
				status: 'pending',
			},
			relations: ['company'],
		});
	}
}
