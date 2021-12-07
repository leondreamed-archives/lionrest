import type { UnionToIntersection } from 'utility-types';

import * as lionrestModules from '../modules';
import type { RestSchema } from './rest';

class MW<R extends RestSchema> {
	// eslint-disable-next-line class-methods-use-this
	t() {
		return lionrestModules['' as keyof typeof lionrestModules]<R>();
	}
}

export type InternalLionecsProperties<R extends RestSchema> =
	UnionToIntersection<ReturnType<MW<R>['t']>>;
