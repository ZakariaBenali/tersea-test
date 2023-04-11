import { sign } from 'jsonwebtoken';

export const generateToken = (payload: object) => {
	const expiresIn = 60 * 60 * 24;
	const token = sign(payload, <string>process.env.JWT_SECRET, { expiresIn });
	return token;
};
