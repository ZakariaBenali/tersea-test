import express, { Application, Router } from 'express';
import { BaseController } from './controllers/base.controller';
import errorHandlerMiddleware from './middleware/error-handler.middleware';
import cors from 'cors';
class App {
	public app: Application;
	public port: number;
	public router = Router();
	constructor(controllers: BaseController[]) {
		this.app = express();
		this.port = process.env.PORT ?? 5000;
		this.app.use(cors());
		this.initializeMiddleware();
		this.initializeControllers(controllers);
		this.initializeErrorHandling();
	}

	public initializeControllers(controllers: BaseController[]) {
		for (const controller of controllers) {
			this.app.use('/api', controller.router);
		}
	}

	private initializeMiddleware() {
		this.app.use(express.json());
	}

	private initializeErrorHandling() {
		this.app.use(errorHandlerMiddleware);
	}

	public start() {
		this.app.listen(this.port, () => {
			console.log(`Listening to port ${this.port}`);
		});
	}
}

export default App;
