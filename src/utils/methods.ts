import type { RestSchemaBlueprint } from '~/types/blueprint';

import type { InternalLionrest } from '../types/lionrest';

export function useDefineMethods<B extends RestSchemaBlueprint>() {
	return function defineMethods<F>(methods: F & ThisType<InternalLionrest<B>>) {
		// Removing the `this` type from the function
		return methods as unknown as F;
	};
}
