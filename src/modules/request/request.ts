import type { RestSchemaBlueprint } from '~/types/blueprint';
import type { HttpMethod } from '~/types/method';
import type { TypedResponsePromise } from '~/types/response';
import type { BaseUrlParams } from '~/types/schema';

import type {
	AreKyOptionsOptional,
	MethodRoutes,
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

	function createKyMethod<Method extends HttpMethod>(method: Method) {
		const { kyMethod } = defineMethods({
			kyMethod<Url extends RestSchemaUrls<MethodRoutes<B, Method>>>(
				url: Url,
				...options: AreKyOptionsOptional<B, Url, Method> extends true
					? [options?: TypedKyOptions<B, Url, Method>]
					: [options: TypedKyOptions<B, Url, Method>]
			): TypedResponsePromise<B, Url, Method> {
				const newUrl = replaceUrlParams(url, options[0]?.urlParams);
				return this._getKy()(newUrl, { method, ...options[0] });
			},
		});
		return kyMethod;
	}

	return defineMethods({
		_getKy() {
			if (this.ky === undefined) {
				throw new Error('A ky client was not passed to Lionrest.');
			}
			return this.ky;
		},
		get: createKyMethod('get'),
		post: createKyMethod('post'),
		put: createKyMethod('put'),
		patch: createKyMethod('patch'),
		delete: createKyMethod('delete'),
	});
}
