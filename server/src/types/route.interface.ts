import { RequestHandler } from 'express';

export type RequestMethod = 'get' | 'post' | 'patch' | 'put' | 'delete';

export interface Route {
	handler: RequestHandler;
	method: RequestMethod;
	path: string;
	middleware: RequestHandler[];
}
