import { DataSource } from 'typeorm';
import { User, Company, Invitation, History } from './../entities';
import { config } from 'dotenv';
config();
let dataSource: DataSource;

function createDataSource() {
	if (!dataSource) {
		dataSource = new DataSource({
			type: process.env.DB_CONNECTION,
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			synchronize: process.env.NODE_ENV && process.env.NODE_ENV === 'development' ? true : false,
			logging: process.env.NODE_ENV === 'production' ? false : true,
			entities: [User, Company, Invitation, History],
			migrations: [`./${process.env.NODE_ENV === 'production' ? 'build' : 'src'}/migrations/*.{ts,js}`],
		});
	}

	return dataSource;
}

export { createDataSource };
