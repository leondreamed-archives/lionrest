import ky from 'ky';

import type { RestSchema } from '../../types/rest';
import { useDefineMethods } from '../../utils/methods';

export function requestModule<S extends RestSchema>() {
	const defineMethods = useDefineMethods<S>();

	return defineMethods({
		get: function <U extends RestSchema>(url, options) {
			return ky.get(url, {

			});
		},
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
