import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import JSONResponse from '../utils/JSONResponse';

// eslint-disable-next-line
function errorHandlerMiddleware(error: HttpException, _: Request, response: Response, __: NextFunction) {
	const status = error.status;
	const message = error.message;
	const data = error.data;
	JSONResponse.error(response, status, message, data);
}

export default errorHandlerMiddleware;
