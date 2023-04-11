import { NextFunction } from 'express';
import { DatabaseError } from 'pg-protocol';
import { QueryFailedError } from 'typeorm';
import HttpException from '../exceptions/HttpException';

export const isQueryFailedError = (err: unknown): err is QueryFailedError & DatabaseError =>
	err instanceof QueryFailedError;

export const formatError = (err, next: NextFunction) => {
	switch (true) {
		case err.code == '23505':
			return next(new HttpException(400, 'Cette email existe déjà'));
			break;
		case err.code == '23503':
			return next(new HttpException(404, "Cett identifiant n'exist pas"));

		default:
			return next(new HttpException(404, "Un problème s'est produit lors de l'enregistrement des données"));
	}
};
