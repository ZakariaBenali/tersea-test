import { Response } from 'express';

export default class JSONResponse {
	static success(res: Response, data?: any, message?: string | null) {
		res.json({
			code: 200,
			message: message || 'Success',
			data,
		});
	}

	static error(res: Response, status: number, error: string, data?: any) {
		res.status(status).json({
			code: status,
			data,
			error,
		});
	}
}
