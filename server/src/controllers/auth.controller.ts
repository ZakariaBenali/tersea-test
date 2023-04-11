import { NextFunction, Request, Response } from 'express';
import { BaseController } from './base.controller';
import { Controller, Route } from '../decorators/routing';
import validationMiddleware from '../middleware/validation.middleware';
import HttpException from '../exceptions/HttpException';
import JSONResponse from '../utils/JSONResponse';
import { QueryFailedError } from 'typeorm';
import { DatabaseError } from 'pg-protocol';
import LoginDTO from '../dto/login.dto';
import { UserService } from '../services/user.service';
import { compare } from 'bcrypt';
import { generateToken } from '../utils/generateToken';

export const isQueryFailedError = (err: unknown): err is QueryFailedError & DatabaseError =>
	err instanceof QueryFailedError;

@Controller()
export default class AuthController extends BaseController {
	public service: UserService;
	constructor() {
		super();
		this.service = new UserService();
	}

	@Route('post', '/login', validationMiddleware(LoginDTO))
	public async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password }: LoginDTO = req.body;
			const user = await this.service.findByEmail(email, true);
			if (!user) {
				next(new HttpException(400, "L'email ou le mot de passe est incorrect"));
			}

			const isPasswordMatch = await compare(password, user.password);
			if (isPasswordMatch) {
				const token = generateToken({
					id: user.id,
					email: user.email,
					isAdmin: user.isAdmin,
				});
				delete user.password;
				JSONResponse.success(res, { ...user, token });
			} else {
				next(new HttpException(400, "L'email ou le mot de passe est incorrect"));
			}
		} catch (err) {
			next(new HttpException(500));
		}
	}
}
