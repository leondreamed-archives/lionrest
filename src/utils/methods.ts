import type { InternalLionrest } from '../types/lionrest';
import type { RestSchemaBlueprint } from './schema';

export function useDefineMethods<R extends RestSchemaBlueprint>() {
	return function defineMethods<F>(methods: F & ThisType<InternalLionrest<R>>) {
		// Removing the `this` type from the function
		return methods as unknown as F;
	};
}
