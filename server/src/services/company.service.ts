import { FindOptionsOrderValue, Repository } from 'typeorm';
import { Company } from '../entities';
import { dataSource } from '../data-source';
import { getFilters } from '../utils/getFilters';

export class CompanyService {
	public repository: Repository<Company>;

	constructor() {
		this.repository = dataSource.getRepository(Company);
	}

	async getAll(sort: FindOptionsOrderValue, name?: string) {
		const filters = getFilters(sort, name);
		return await this.repository.find(filters);
	}

	async store(name: string) {
		return await this.repository.create(new Company(name)).save();
	}

	async delete(id: number) {
		return await this.repository.delete(id);
	}

	async update(id: string, name: string) {
		return await this.repository.update(id, {
			name,
		});
	}
}
