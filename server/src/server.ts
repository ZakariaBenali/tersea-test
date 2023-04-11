import { config } from 'dotenv';
import App from './App';
import { createDataSource } from './lib/typeorm';
import CompanyController from './controllers/company.controller';
import InvitationController from './controllers/invitation.controller';
import UserController from './controllers/user.controller';
import AuthController from './controllers/auth.controller';
import HistoryController from './controllers/history.controller';
config();

async function main() {
	const dataSource = createDataSource();
	await dataSource.initialize();
	const app = new App([
		new UserController(),
		new CompanyController(),
		new InvitationController(),
		new AuthController(),
		new HistoryController(),
	]);
	app.start();
}

main();
