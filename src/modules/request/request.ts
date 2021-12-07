import ky from 'ky';

import type { TypedResponsePromise } from '~/types/response';
import type { RestSchemaBlueprint } from '~/utils/schema';

import type {
	DeleteRoutes,
	GetRoutes,
	PatchRoutes,
	PostRoutes,
	PutRoutes,
	RestSchemaUrls,
	TypedKyOptions,
} from '../../types/request';
import { useDefineMethods } from '../../utils/methods';

export function requestModule<B extends RestSchemaBlueprint>() {
	const defineMethods = useDefineMethods<B>();

	return defineMethods({
		get<Url extends RestSchemaUrls<GetRoutes<B>>>(
			url: Url,
			options: TypedKyOptions<B, Url, 'get'>
		): TypedResponsePromise<B, Url, 'get'> {
			return ky.get(url, options);
		},
		post<Url extends RestSchemaUrls<PostRoutes<B>>>(
			url: Url,
			options: TypedKyOptions<B, Url, 'post'>
		): TypedResponsePromise<B, Url, 'post'> {
			return ky.post(url, options);
		},
		put<Url extends RestSchemaUrls<PutRoutes<B>>>(
			url: Url,
			options: TypedKyOptions<B, Url, 'put'>
		): TypedResponsePromise<B, Url, 'put'> {
			return ky.put(url, options);
		},
		patch<Url extends RestSchemaUrls<PatchRoutes<B>>>(
			url: Url,
			options: TypedKyOptions<B, Url, 'patch'>
		): TypedResponsePromise<B, Url, 'patch'> {
			return ky.patch(url, options);
		},
		delete<Url extends RestSchemaUrls<DeleteRoutes<B>>>(
			url: Url,
			options: TypedKyOptions<B, Url, 'delete'>
		): TypedResponsePromise<B, Url, 'delete'> {
			return ky.delete(url, options);
		},
	});
}
