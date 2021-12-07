import type { ComponentMap } from '~/types/component';

import type { InternalLionecs, LionecsExtras, RestSchema } from '../types/rest';

export function useDefineMethods<S extends RestSchema>() {
	return function defineMethods<F>(
		methods: F & ThisType<InternalLionecs<M, X> & X>
	) {
		// Removing the `this` type from the function
		return methods as unknown as F;
	};
}
