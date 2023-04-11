import { FindOptionsOrderValue, Like } from 'typeorm';

export const getFilters = (sort: FindOptionsOrderValue, name?: string) => {
	return {
		order: {
			name: sort,
		},
		...(name && {
			where: {
				name: Like(`%${name}%`),
			},
		}),
	};
};
