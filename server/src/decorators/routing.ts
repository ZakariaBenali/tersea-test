import { RequestHandler, Router } from 'express';
import { RequestMethod, Route } from '../types/route.interface';
import { ROUTE_METADATA_KEY, addRouteMetadata } from '../utils/metadata';

export const Controller =
	(_prefix = '') =>
	<T extends { new (...args: any[]): object }>(constructor: T) => {
		return class extends constructor {
			routes = Reflect.getMetadata(ROUTE_METADATA_KEY, constructor);
			prefix = _prefix;
			router = Router();
			constructor(...args: any[]) {
				super(...args);
				this.routes.map((route: Route) => {
					const path = `${this.prefix}${route.path}`;
					this.router[route.method](path, ...route.middleware, route.handler.bind(this));
				});
			}
		};
	};

export function Route(method: RequestMethod, path = '', ...middleware: RequestHandler[]): MethodDecorator {
	return function (target: any, _, descriptor: PropertyDescriptor) {
		const routeMetadata: Route = {
			path,
			handler: descriptor.value,
			method: method,
			middleware,
		};
		addRouteMetadata(target, routeMetadata);
	};
}
