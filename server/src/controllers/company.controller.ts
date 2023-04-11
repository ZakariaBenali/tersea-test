import { NextFunction, Request, Response } from 'express';
import { BaseController } from './base.controller';
import { Controller, Route } from '../decorators/routing';
import validationMiddleware from '../middleware/validation.middleware';
import HttpException from '../exceptions/HttpException';
import { CompanyService } from '../services/company.service';
import JSONResponse from '../utils/JSONResponse';
import CompanyDTO from '../dto/company.dto';
import { InvitationService } from '../services/invitation.service';
import { FindOptionsOrderValue, QueryFailedError } from 'typeorm';
import { DatabaseError } from 'pg-protocol';
import authMiddleware from '../middleware/auth.middleware';

export const isQueryFailedError = (err: unknown): err is QueryFailedError & DatabaseError =>
	err instanceof QueryFailedError;

@Controller('/company')
export default class CompanyController extends BaseController {
	public service: CompanyService;
	public invitationService: InvitationService;
	constructor() {
		super();
		this.service = new CompanyService();
		this.invitationService = new InvitationService();
	}

	@Route('get', '/all', authMiddleware(true))
	public async index(
		req: Request<
			object,
			any,
			any,
			{
				name: string;
				sort: FindOptionsOrderValue;
			}
		>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { name, sort = 'ASC' } = req.query;
			const companies = await this.service.getAll(sort, name);
			JSONResponse.success(res, companies);
		} catch {
			next(new HttpException(500));
		}
	}

	@Route('post', '/store', authMiddleware(true), validationMiddleware(CompanyDTO))
	public async store(req: Request, res: Response, next: NextFunction) {
		try {
			const { name }: CompanyDTO = req.body;
			const company = await this.service.store(name);
			JSONResponse.success(res, company);
		} catch {
			next(new HttpException(500));
		}
	}

	@Route('delete', '/delete/:id', authMiddleware(true))
	public async destroy(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const companyId = Number(id);
			const data = await this.service.delete(companyId);
			if (data.affected > 0) {
				JSONResponse.success(res);
			} else {
				next(new HttpException(404, 'Entreprise non trouvée'));
			}
		} catch (err) {
			next(new HttpException(500));
		}
	}

	@Route('put', '/update/:id', authMiddleware(true), validationMiddleware(CompanyDTO))
	public async update(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { name } = req.body;
			const data = await this.service.update(id, name);
			if (data.affected > 0) {
				JSONResponse.success(res);
			} else {
				next(new HttpException(404, 'Entreprise non trouvée'));
			}
		} catch {
			next(new HttpException(500));
		}
	}
}
