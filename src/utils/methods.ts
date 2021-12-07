import type { InternalLionrest } from '../types/lionrest';
import type { BaseRestSchema } from '../types/schema';

export function useDefineMethods<R extends BaseRestSchema>() {
	return function defineMethods<F>(methods: F & ThisType<InternalLionrest<R>>) {
		// Removing the `this` type from the function
		return methods as unknown as F;
	};
}
