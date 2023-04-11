import { NextFunction, Request, Response } from 'express';
import { BaseController } from './base.controller';
import { Controller, Route } from '../decorators/routing';
import validationMiddleware from '../middleware/validation.middleware';
import HttpException from '../exceptions/HttpException';
import JSONResponse from '../utils/JSONResponse';
import InvitationDTO from '../dto/invitation.dto';
import { MailService } from '../services/email.service';
import { InvitationService } from '../services/invitation.service';
import authMiddleware, { RequestWithUserInfo } from '../middleware/auth.middleware';
import { historyAction } from '../entities/history.entity';
import { HistoryService } from '../services/history.service';
import { formatError, isQueryFailedError } from '../utils/formatError';
import { UserService } from '../services/user.service';

@Controller('/invitation')
export default class InvitationController extends BaseController {
	public invitationService: InvitationService;
	public historyService: HistoryService;
	public userService: UserService;
	constructor() {
		super();
		this.invitationService = new InvitationService();
		this.historyService = new HistoryService();
		this.userService = new UserService();
	}

	@Route('get', '/all', authMiddleware(true))
	public async all(_: Request, res: Response, next: NextFunction) {
		try {
			const invitations = await this.invitationService.getAll();
			JSONResponse.success(res, invitations);
		} catch {
			next(new HttpException(500));
		}
	}

	@Route('post', '/store/:companyId', authMiddleware(true), validationMiddleware(InvitationDTO))
	public async invite(req: RequestWithUserInfo, res: Response, next: NextFunction) {
		try {
			const { companyId } = req.params;
			const { name, email }: InvitationDTO = req.body;
			const user = await this.userService.findByEmail(email);
			if (user) {
				return next(new HttpException(400, 'Un utilisateur exist deja avec cette email'));
			}
			const invitation = await this.invitationService.store(name, email, companyId);
			const mailService = new MailService();
			const link = `${process.env.INVITATION_LINK}/${invitation.id}`;
			await mailService.sendEmail(
				'zakaria@app.com',
				email,
				`Invited to join company: ${companyId}`,
				`<a href="${link}">${link}</a>`,
			);
			const userInfo = req.userInfo;
			await this.historyService.store(userInfo.id, invitation.id, historyAction.created);
			JSONResponse.success(res);
		} catch (err) {
			if (isQueryFailedError(err)) {
				return formatError(err, next);
			}
			next(new HttpException(500));
		}
	}

	@Route('put', '/update/:id', authMiddleware(true))
	public async cancel(req: RequestWithUserInfo, res: Response, next: NextFunction) {
		const { id } = req.params;
		try {
			this.invitationService.updateStatus(id, 'canceled');
			const user = req.userInfo;
			await this.historyService.store(user.id, id, historyAction.canceled);
			JSONResponse.success(res);
		} catch {
			next(new HttpException(500));
		}
	}

	@Route('get', '/:id')
	public async getSingle(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
		try {
			const data = await this.invitationService.getPendingById(id);
			if (!data) {
				return next(new HttpException(404));
			}
			JSONResponse.success(res, data);
		} catch (err) {
			next(new HttpException(500));
		}
	}
}
