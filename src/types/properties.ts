import type { UnionToIntersection } from 'utility-types';

import * as lionrestModules from '../modules';
import type { BaseRestSchema } from './schema';

class MW<R extends BaseRestSchema> {
	// eslint-disable-next-line class-methods-use-this
	t() {
		return lionrestModules['' as keyof typeof lionrestModules]<R>();
	}
}

export type InternalLionrestProperties<R extends BaseRestSchema> =
	UnionToIntersection<ReturnType<MW<R>['t']>>;
