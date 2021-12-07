import ky from 'ky';

import type { BaseRestSchema } from '../../types/schema';
import { useDefineMethods } from '../../utils/methods';

export function requestModule<S extends BaseRestSchema>() {
	const defineMethods = useDefineMethods<S>();

	return defineMethods({
		get(url, options) {},
		post(url, options) {
			return ky.post(url, options);
		},
		patch(url, options) {
			return ky.patch(url, options);
		},
		delete(url, options) {
			return ky.delete(url, options);
		},
		put(url, options) {
			return ky.put(url, options);
		},
	});
}
