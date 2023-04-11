import { NextFunction, Request, Response } from 'express';
import { BaseController } from './base.controller';
import { Controller, Route } from '../decorators/routing';
import validationMiddleware from '../middleware/validation.middleware';
import { UserService } from '../services/user.service';
import JSONResponse from '../utils/JSONResponse';
import HttpException from '../exceptions/HttpException';
import { verify } from 'jsonwebtoken';
import authMiddleware from '../middleware/auth.middleware';
import { getToken } from '../utils/getToken';
import { InvitationService } from '../services/invitation.service';
import AdminDTO from '../dto/admin.dto';
import UserDTO from '../dto/user.dto';
import { FindOptionsOrderValue } from 'typeorm';
import { HistoryService } from '../services/history.service';
import { historyAction } from '../entities/history.entity';
import { formatError, isQueryFailedError } from '../utils/formatError';

@Controller('/user')
export default class UserController extends BaseController {
	public service: UserService;
	public invitationService: InvitationService;
	public historyService: HistoryService;

	constructor() {
		super();
		this.historyService = new HistoryService();
		this.service = new UserService();
		this.invitationService = new InvitationService();
	}

	@Route('post', '/admin/store', authMiddleware(true), validationMiddleware(AdminDTO))
	public async storeAdmin(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, name, password }: AdminDTO = req.body;
			const user = await this.service.createUser(name, email, password, true);
			delete user.password;
			JSONResponse.success(res, user);
		} catch (err) {
			if (isQueryFailedError(err)) {
				return formatError(err, next);
			}
			next(new HttpException(500));
		}
	}

	@Route('post', '/store', validationMiddleware(UserDTO))
	public async store(req: Request, res: Response, next: NextFunction) {
		try {
			const { invitation_id, password }: UserDTO = req.body;
			const invitation = await this.invitationService.getPendingById(invitation_id);
			if (!invitation) {
				return next(new HttpException(400, 'Invitation non trouvée ou non valide'));
			}
			const { name, email, companyId } = invitation;
			const user = await this.service.createUser(name, email, password, false, companyId);
			invitation.status = 'confirmed';
			invitation.save();
			delete user.password;
			await this.historyService.store(user.id, invitation.id, historyAction.approved);
			JSONResponse.success(res, user);
		} catch (err) {
			if (isQueryFailedError(err)) {
				return formatError(err, next);
			}
			next(new HttpException(500));
		}
	}

	@Route('get', '/me', authMiddleware())
	public async me(req: Request, res: Response, next: NextFunction) {
		try {
			const token = req.headers.authorization.split(' ')[1];
			const decoded = verify(token, process.env.JWT_SECRET);
			const user = await this.service.findByEmail(decoded.email);
			delete user.password;
			JSONResponse.success(res, user);
		} catch {
			next(new HttpException(500));
		}
	}

	@Route('get', '/all', authMiddleware(true))
	public async all(
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
			const employees = await this.service.getAll(sort, name);
			JSONResponse.success(res, employees);
		} catch {
			next(new HttpException(500));
		}
	}

	@Route('put', '/profile', authMiddleware())
	public async update(req: Request, res: Response, next: NextFunction) {
		try {
			const { name, password } = req.body;
			const token = getToken(req);
			const user = await this.service.findByEmail(token.email);
			if (!user) {
				next(new HttpException(400, 'Utilisateur introuvable'));
			}
			if (password) {
				user.password = password;
				user.hashPassword();
			}
			if (name) {
				user.name = name;
			}
			user.save();
			JSONResponse.success(res);
		} catch {
			next(new HttpException(500));
		}
	}
}
