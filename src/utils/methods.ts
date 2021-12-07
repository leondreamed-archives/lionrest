import type { InternalLionrest } from '../types/lionrest';
import type { RestSchema } from '../types/rest';

export function useDefineMethods<R extends RestSchema>() {
	return function defineMethods<F>(methods: F & ThisType<InternalLionrest<R>>) {
		// Removing the `this` type from the function
		return methods as unknown as F;
	};
}
