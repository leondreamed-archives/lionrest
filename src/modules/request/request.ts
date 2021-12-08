import ky from 'ky';

import type { RestSchemaBlueprint } from '~/types/blueprint';
import type { TypedResponsePromise } from '~/types/response';

import type {
	AreKyOptionsOptional,
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
			...options: AreKyOptionsOptional<B, Url, 'get'> extends true
				? [options?: TypedKyOptions<B, Url, 'get'>]
				: [options: TypedKyOptions<B, Url, 'get'>]
		): TypedResponsePromise<B, Url, 'get'> {
			return ky.get(url, options[0]);
		},
		post<Url extends RestSchemaUrls<PostRoutes<B>>>(
			url: Url,
			...options: AreKyOptionsOptional<B, Url, 'post'> extends true
				? [options?: TypedKyOptions<B, Url, 'post'>]
				: [options: TypedKyOptions<B, Url, 'post'>]
		): TypedResponsePromise<B, Url, 'post'> {
			return ky.post(url, options[0]);
		},
		put<Url extends RestSchemaUrls<PutRoutes<B>>>(
			url: Url,
			...options: AreKyOptionsOptional<B, Url, 'put'> extends true
				? [options?: TypedKyOptions<B, Url, 'put'>]
				: [options: TypedKyOptions<B, Url, 'put'>]
		): TypedResponsePromise<B, Url, 'put'> {
			return ky.put(url, options[0]);
		},
		patch<Url extends RestSchemaUrls<PatchRoutes<B>>>(
			url: Url,
			...options: AreKyOptionsOptional<B, Url, 'patch'> extends true
				? [options?: TypedKyOptions<B, Url, 'patch'>]
				: [options: TypedKyOptions<B, Url, 'patch'>]
		): TypedResponsePromise<B, Url, 'patch'> {
			return ky.patch(url, options[0]);
		},
		delete<Url extends RestSchemaUrls<DeleteRoutes<B>>>(
			url: Url,
			...options: AreKyOptionsOptional<B, Url, 'delete'> extends true
				? [options?: TypedKyOptions<B, Url, 'delete'>]
				: [options: TypedKyOptions<B, Url, 'delete'>]
		): TypedResponsePromise<B, Url, 'delete'> {
			return ky.delete(url, options[0]);
		},
	});
}
