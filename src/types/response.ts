import type { ResponsePromise } from 'ky';

import type { HttpMethod } from './method';
import type { BaseRestSchema, BaseRouteMethodSchema } from './schema';

export type TypedResponsePromise<
	R extends BaseRestSchema,
	Url extends string,
	Method extends HttpMethod
> = ResponsePromise & {
	json(): Promise<
		R[Url][Method] extends BaseRouteMethodSchema
			? R[Url][Method]['reply']
			: never
	>;
};
