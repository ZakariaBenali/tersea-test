import { FindOptionsOrderValue, Repository } from 'typeorm';
import { User } from '../entities';
import { dataSource } from '../data-source';
import { getFilters } from '../utils/getFilters';

export class UserService {
	public repository: Repository<User>;

	constructor() {
		this.repository = dataSource.getRepository(User);
	}

	async createUser(name: string, email: string, password: string, isAdmin = false, companyId?: number) {
		return await this.repository.create(new User(name, email, password, isAdmin, companyId)).save();
	}

	async findByEmail(email: string, withPassword = false) {
		return await this.repository.findOne({
			where: {
				email,
			},
			...(withPassword && {
				select: ['id', 'email', 'name', 'password', 'company', 'createdAt', 'isAdmin'],
			}),
			relations: ['company'],
		});
	}
	async getAll(sort: FindOptionsOrderValue, name?: string) {
		const filters = getFilters(sort, name);
		return await this.repository.find({
			...filters,
			relations: ['company'],
		});
	}
}
