import { Route } from '../types/route.interface';
export const ROUTE_METADATA_KEY = Symbol('controller:route:key');

export function addRouteMetadata(target: any, metadata: Route) {
	const constructor = target.constructor;
	let routeMetadataList: Route[] = Reflect.getMetadata(ROUTE_METADATA_KEY, constructor);
	if (!routeMetadataList) {
		routeMetadataList = [];
		Reflect.defineMetadata(ROUTE_METADATA_KEY, routeMetadataList, constructor);
	}
	routeMetadataList.push(metadata);
}
