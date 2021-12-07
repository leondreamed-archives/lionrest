import ky from 'ky';

import type { TypedResponsePromise } from '~/types/response';

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
			options: TypedKyOptions<S, Url, 'get'>
		): TypedResponsePromise<S, Url, 'get'> {
			return ky.get(url, options);
		},
		post<Url extends RestSchemaUrls<PostRoutes<S>>>(
			url: Url,
			options: TypedKyOptions<S, Url, 'post'>
		): TypedResponsePromise<S, Url, 'post'> {
			return ky.post(url, options);
		},
		put<Url extends RestSchemaUrls<PutRoutes<S>>>(
			url: Url,
			options: TypedKyOptions<S, Url, 'put'>
		): TypedResponsePromise<S, Url, 'put'> {
			return ky.put(url, options);
		},
		patch<Url extends RestSchemaUrls<PatchRoutes<S>>>(
			url: Url,
			options: TypedKyOptions<S, Url, 'patch'>
		): TypedResponsePromise<S, Url, 'patch'> {
			return ky.patch(url, options);
		},
		delete<Url extends RestSchemaUrls<DeleteRoutes<S>>>(
			url: Url,
			options: TypedKyOptions<S, Url, 'delete'>
		): TypedResponsePromise<S, Url, 'delete'> {
			return ky.delete(url, options);
		},
	});
}
