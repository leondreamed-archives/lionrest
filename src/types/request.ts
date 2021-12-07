import type { Options } from 'ky';

import type { HttpMethod } from './method';
import type {
	BaseGetSchema,
	BaseNonGetSchema,
	BaseRestSchema,
	BaseRouteMethodSchema,
} from './schema';

export type GetRoutes<R extends BaseRestSchema> = {
	[K in keyof R as R[K] extends { get: unknown } ? K : never]: R[K];
};

export type PostRoutes<R extends BaseRestSchema> = {
	[K in keyof R as R[K] extends { post: unknown } ? K : never]: R[K];
};

export type PutRoutes<R extends BaseRestSchema> = {
	[K in keyof R as R[K] extends { put: unknown } ? K : never]: R[K];
};

export type PatchRoutes<R extends BaseRestSchema> = {
	[K in keyof R as R[K] extends { patch: unknown } ? K : never]: R[K];
};

export type DeleteRoutes<R extends BaseRestSchema> = {
	[K in keyof R as R[K] extends { delete: unknown } ? K : never]: R[K];
};

export type RestSchemaUrls<R extends BaseRestSchema> = keyof R & string;

export type TypedKyOptions<
	R extends BaseRestSchema,
	Url extends RestSchemaUrls<R>,
	Method extends HttpMethod
> = Options &
	(R[Url][Method] extends BaseRouteMethodSchema
		? R[Url][Method] extends BaseGetSchema
			? {
					method: 'GET';
					headers: R[Url][Method]['headers'];
					searchParams: R[Url][Method]['searchParams'];
			  }
			: R[Url][Method] extends BaseNonGetSchema
			? {
					method: Uppercase<Method>;
					headers: R[Url][Method]['headers'];
					body: R[Url][Method]['body'];
			  }
			: never
		: never);
