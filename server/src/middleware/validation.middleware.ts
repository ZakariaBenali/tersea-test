import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import express from 'express';
import HttpException from '../exceptions/HttpException';

function validationMiddleware<T extends object>(type: ClassConstructor<T>): express.RequestHandler {
	return async (req, _, next) => {
		const errors = await validate(plainToClass(type, req.body));
		if (errors.length > 0) {
			const data = errors.map((error) => {
				return {
					name: error.property,
					message: Object.values(error.constraints).join(', '),
				};
			});
			next(new HttpException(400, 'Données non valables', data));
		}
		next();
	};
}

export default validationMiddleware;
