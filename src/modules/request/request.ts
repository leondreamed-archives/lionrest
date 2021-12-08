import type { RestSchemaBlueprint } from '~/types/blueprint';
import type { TypedResponsePromise } from '~/types/response';
import type { BaseUrlParams } from '~/types/schema';

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

	function replaceUrlParams(url: string, urlParams: BaseUrlParams | undefined) {
		// TODO: make the following code more efficient
		if (urlParams === undefined) return url;
		let newUrl = url;
		for (const [param, value] of Object.entries(urlParams)) {
			newUrl = newUrl.replace(`{${param}}`, value.toString());
		}
		if (newUrl[0] === '/') newUrl = newUrl.slice(1);
		return newUrl;
	}

	return defineMethods({
		_getKy() {
			if (this.ky === undefined) {
				throw new Error('A ky client was not passed to Lionrest.');
			}
			return this.ky;
		},
		get<Url extends RestSchemaUrls<GetRoutes<B>>>(
			url: Url,
			...options: AreKyOptionsOptional<B, Url, 'get'> extends true
				? [options?: TypedKyOptions<B, Url, 'get'>]
				: [options: TypedKyOptions<B, Url, 'get'>]
		): TypedResponsePromise<B, Url, 'get'> {
			const newUrl = replaceUrlParams(url, options[0]?.urlParams);
			return this._getKy().get(newUrl, options[0]);
		},
		post<Url extends RestSchemaUrls<PostRoutes<B>>>(
			url: Url,
			...options: AreKyOptionsOptional<B, Url, 'post'> extends true
				? [options?: TypedKyOptions<B, Url, 'post'>]
				: [options: TypedKyOptions<B, Url, 'post'>]
		): TypedResponsePromise<B, Url, 'post'> {
			const newUrl = replaceUrlParams(url, options[0]?.urlParams);
			return this._getKy().post(newUrl, options[0]);
		},
		put<Url extends RestSchemaUrls<PutRoutes<B>>>(
			url: Url,
			...options: AreKyOptionsOptional<B, Url, 'put'> extends true
				? [options?: TypedKyOptions<B, Url, 'put'>]
				: [options: TypedKyOptions<B, Url, 'put'>]
		): TypedResponsePromise<B, Url, 'put'> {
			const newUrl = replaceUrlParams(url, options[0]?.urlParams);
			return this._getKy().put(newUrl, options[0]);
		},
		patch<Url extends RestSchemaUrls<PatchRoutes<B>>>(
			url: Url,
			...options: AreKyOptionsOptional<B, Url, 'patch'> extends true
				? [options?: TypedKyOptions<B, Url, 'patch'>]
				: [options: TypedKyOptions<B, Url, 'patch'>]
		): TypedResponsePromise<B, Url, 'patch'> {
			const newUrl = replaceUrlParams(url, options[0]?.urlParams);
			return this._getKy().patch(newUrl, options[0]);
		},
		delete<Url extends RestSchemaUrls<DeleteRoutes<B>>>(
			url: Url,
			...options: AreKyOptionsOptional<B, Url, 'delete'> extends true
				? [options?: TypedKyOptions<B, Url, 'delete'>]
				: [options: TypedKyOptions<B, Url, 'delete'>]
		): TypedResponsePromise<B, Url, 'delete'> {
			const newUrl = replaceUrlParams(url, options[0]?.urlParams);
			return this._getKy().delete(newUrl, options[0]);
		},
	});
}
