import type { UnionToIntersection } from 'utility-types';

import type { RestSchemaBlueprint } from '~/utils/schema';

import * as lionrestModules from '../modules';

class MW<R extends RestSchemaBlueprint> {
	// eslint-disable-next-line class-methods-use-this
	t() {
		return lionrestModules['' as keyof typeof lionrestModules]<R>();
	}
}

export type InternalLionrestProperties<R extends RestSchemaBlueprint> =
	UnionToIntersection<ReturnType<MW<R>['t']>>;
