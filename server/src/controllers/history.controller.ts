import { NextFunction, Request, Response } from 'express';
import { BaseController } from './base.controller';
import { Controller, Route } from '../decorators/routing';
import HttpException from '../exceptions/HttpException';
import JSONResponse from '../utils/JSONResponse';
import { HistoryService } from '../services/history.service';
import authMiddleware from '../middleware/auth.middleware';

@Controller('/history')
export default class HistoryController extends BaseController {
	public historyService: HistoryService;
	constructor() {
		super();
		this.historyService = new HistoryService();
	}

	@Route('get', '/all', authMiddleware(true))
	public async getSingle(_: Request, res: Response, next: NextFunction) {
		try {
			const data = await this.historyService.getAll();
			JSONResponse.success(res, data);
		} catch (err) {
			next(new HttpException(500));
		}
	}
}
