import type { ResponsePromise } from 'ky';

import type {
	RestSchemaBlueprint,
	RestSchemaTypeFromBlueprint,
} from './blueprint';
import type { HttpMethod } from './method';
import type { BaseRouteMethodSchema } from './schema';

export type TypedResponsePromise<
	B extends RestSchemaBlueprint,
	Url extends string,
	Method extends HttpMethod
> = ResponsePromise & {
	json(): Promise<
		RestSchemaTypeFromBlueprint<B>[Url][Method] extends BaseRouteMethodSchema
			? RestSchemaTypeFromBlueprint<B>[Url][Method]['replies']
			: never
	>;
};
