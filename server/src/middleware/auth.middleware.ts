import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { verify, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

export interface RequestWithUserInfo extends Request {
	userInfo: {
		id: number;
		email: string;
		isAdmin: boolean;
	};
}

function authMiddleware(isAdminRoute = false) {
	return (req: Request, _: Response, next: NextFunction) => {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			return next(new HttpException(401, 'Token non trouvé'));
		}
		try {
			const decoded: any = verify(token, process.env.JWT_SECRET);
			if (!decoded.email) {
				return next(new HttpException(401, 'Token non trouvé'));
			}
			if (decoded.exp && Date.now() >= decoded.exp * 1000) {
				return next(new HttpException(401, 'Le token a expiré'));
			}
			if (!decoded.isAdmin && isAdminRoute) {
				return next(new HttpException(401, "Vous n'avez pas les permissions d'accéder à cet itinéraire"));
			}
			Object.defineProperty(req, 'userInfo', {
				value: {
					id: decoded.id,
					email: decoded.email,
					isAdmin: decoded.isAdmin,
				},
				writable: false,
			});
			next();
		} catch (error) {
			if (error instanceof TokenExpiredError) {
				return next(new HttpException(401, 'Le token a expiré'));
			} else if (error instanceof JsonWebTokenError) {
				return next(new HttpException(401, 'Token non valide'));
			}
			return next(new HttpException(500));
		}
	};
}

export default authMiddleware;
