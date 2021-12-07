import ky from 'ky';

import type {
	DeleteRoutes,
	GetRoutes,
	PatchRoutes,
	PostRoutes,
	PutRoutes,
	RestSchemaUrls,
	TypedKyOptions,
} from '../../types/request';
import type { BaseRestSchema } from '../../types/schema';
import { useDefineMethods } from '../../utils/methods';

export function requestModule<S extends BaseRestSchema>() {
	const defineMethods = useDefineMethods<S>();

	return defineMethods({
		get<Url extends RestSchemaUrls<GetRoutes<S>>>(
			url: Url,
			options: TypedKyOptions<S, 'get', Url>
		) {
			return ky.get(url, options);
		},
		post<Url extends RestSchemaUrls<PostRoutes<S>>>(
			url: Url,
			options: TypedKyOptions<S, 'post', Url>
		) {
			return ky.post(url, options);
		},
		put<Url extends RestSchemaUrls<PutRoutes<S>>>(
			url: Url,
			options: TypedKyOptions<S, 'put', Url>
		) {
			return ky.put(url, options);
		},
		patch<Url extends RestSchemaUrls<PatchRoutes<S>>>(
			url: Url,
			options: TypedKyOptions<S, 'patch', Url>
		) {
			return ky.patch(url, options);
		},
		delete<Url extends RestSchemaUrls<DeleteRoutes<S>>>(
			url: Url,
			options: TypedKyOptions<S, 'delete', Url>
		) {
			return ky.delete(url, options);
		},
	});
}
