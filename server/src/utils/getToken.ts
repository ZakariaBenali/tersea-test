import { Request } from 'express';
import { verify } from 'jsonwebtoken';

export const getToken = (req: Request) => {
	const token = req.headers.authorization.split(' ')[1];
	return verify(token, process.env.JWT_SECRET);
};
