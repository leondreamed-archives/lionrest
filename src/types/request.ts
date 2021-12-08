import type { Options } from 'ky';

import type {
	RestSchemaBlueprint,
	RestSchemaTypeFromBlueprint,
	RouteMethodBlueprintBody,
	RouteMethodBlueprintHeaders,
	RouteMethodBlueprintSearchParams,
	RouteMethodBlueprintUrlParams,
} from './blueprint';
import type { HttpMethod } from './method';
import type {
	BaseGetSchema,
	BaseNonGetSchema,
	BaseRouteMethodSchema,
	UrlParam,
} from './schema';

export type MethodRoutes<
	B extends RestSchemaBlueprint,
	Method extends HttpMethod
> = {
	[K in keyof B as B[K] extends { [K in Method]: unknown } ? K : never]: B[K];
};

export type GetRoutes<B extends RestSchemaBlueprint> = MethodRoutes<B, 'get'>;
export type PostRoutes<B extends RestSchemaBlueprint> = MethodRoutes<B, 'post'>;
export type PutRoutes<B extends RestSchemaBlueprint> = MethodRoutes<B, 'put'>;
export type PatchRoutes<B extends RestSchemaBlueprint> = MethodRoutes<
	B,
	'patch'
>;
export type DeleteRoutes<B extends RestSchemaBlueprint> = MethodRoutes<
	B,
	'delete'
>;

export type RestSchemaUrls<B extends RestSchemaBlueprint> = keyof B & string;

export type TypedKyOptions<
	B extends RestSchemaBlueprint,
	Url extends RestSchemaUrls<B>,
	Method extends HttpMethod
> = Options & {
	urlParams?: Record<string, UrlParam>;
} & (RestSchemaTypeFromBlueprint<B>[Url] extends {
		urlParams: RouteMethodBlueprintUrlParams;
	}
		? {
				urlParams: RestSchemaTypeFromBlueprint<B>[Url]['urlParams'];
		  }
		: Record<never, never>) &
	(RestSchemaTypeFromBlueprint<B>[Url][Method] extends BaseRouteMethodSchema
		? RestSchemaTypeFromBlueprint<B>[Url][Method] extends BaseGetSchema
			? {
					method?: 'GET';
			  } & (RestSchemaTypeFromBlueprint<B>[Url][Method] extends {
					headers: RouteMethodBlueprintHeaders;
			  }
					? {
							headers: RestSchemaTypeFromBlueprint<B>[Url][Method]['headers'];
					  }
					: Record<never, never>) &
					(RestSchemaTypeFromBlueprint<B>[Url][Method] extends {
						searchParams: RouteMethodBlueprintSearchParams;
					}
						? {
								searchParams: RestSchemaTypeFromBlueprint<B>[Url][Method]['searchParams'];
						  }
						: Record<never, never>)
			: RestSchemaTypeFromBlueprint<B>[Url][Method] extends BaseNonGetSchema
			? {
					method?: Uppercase<Method>;
			  } & (RestSchemaTypeFromBlueprint<B>[Url][Method] extends {
					headers: RouteMethodBlueprintHeaders;
			  }
					? {
							headers: RestSchemaTypeFromBlueprint<B>[Url][Method]['headers'];
					  }
					: Record<never, never>) &
					(RestSchemaTypeFromBlueprint<B>[Url][Method] extends {
						body: RouteMethodBlueprintBody;
					}
						? {
								body: RestSchemaTypeFromBlueprint<B>[Url][Method]['body'];
						  }
						: Record<never, never>)
			: never
		: never);

export type AreKyOptionsOptional<
	B extends RestSchemaBlueprint,
	Url extends RestSchemaUrls<B>,
	Method extends HttpMethod
> = RestSchemaTypeFromBlueprint<B>[Url][Method] extends BaseRouteMethodSchema
	? RestSchemaTypeFromBlueprint<B>[Url][Method] extends BaseGetSchema
		?
				| RestSchemaTypeFromBlueprint<B>[Url][Method]['headers']
				| RestSchemaTypeFromBlueprint<B>[Url][Method]['searchParams'] extends undefined
			? true
			: false
		: RestSchemaTypeFromBlueprint<B>[Url][Method] extends BaseNonGetSchema
		?
				| RestSchemaTypeFromBlueprint<B>[Url][Method]['headers']
				| RestSchemaTypeFromBlueprint<B>[Url][Method]['body'] extends undefined
			? true
			: false
		: never
	: never;
