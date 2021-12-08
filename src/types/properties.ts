import type { UnionToIntersection } from 'utility-types';

import * as lionrestModules from '../modules';
import type { RestSchemaBlueprint } from './blueprint';

class MW<B extends RestSchemaBlueprint> {
	// eslint-disable-next-line class-methods-use-this
	t() {
		return lionrestModules['' as keyof typeof lionrestModules]<B>();
	}
}

export type InternalLionrestProperties<B extends RestSchemaBlueprint> =
	UnionToIntersection<ReturnType<MW<B>['t']>>;
