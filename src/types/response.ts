import type { ResponsePromise } from 'ky';

import type {
	RestSchemaBlueprint,
	RestSchemaTypeFromBlueprint,
} from '~/utils/schema';

import type { HttpMethod } from './method';
import type { BaseRouteMethodSchema } from './schema';

export type TypedResponsePromise<
	R extends RestSchemaBlueprint,
	Url extends string,
	Method extends HttpMethod
> = ResponsePromise & {
	json(): Promise<
		RestSchemaTypeFromBlueprint<R>[Url][Method] extends BaseRouteMethodSchema
			? RestSchemaTypeFromBlueprint<R>[Url][Method]['replies']
			: never
	>;
};
