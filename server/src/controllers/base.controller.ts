import { Router } from 'express';
import { Route } from '../types/route.interface';

export abstract class BaseController {
	public router: Router;
	public routes: Route[] = [];
	public prefix = '';
}
