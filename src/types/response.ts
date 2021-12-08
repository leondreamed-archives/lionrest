import type { ResponsePromise } from 'ky';
import type { $Values } from 'utility-types';

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
> = Omit<ResponsePromise, 'json'> & {
	json(): Promise<
		RestSchemaTypeFromBlueprint<B>[Url][Method] extends BaseRouteMethodSchema
			? $Values<RestSchemaTypeFromBlueprint<B>[Url][Method]['replies']>['data']
			: never
	>;
};
