import type { RestSchemaBlueprint } from '~/types/blueprint';
import type { HttpMethod } from '~/types/method';
import type { ServerRepliesCreator } from '~/types/reply';
import type { MethodRoutes, RestSchemaUrls } from '~/types/request';

import { useDefineMethods } from '../../utils/methods';

export function replyModule<B extends RestSchemaBlueprint>() {
	const defineMethods = useDefineMethods<B>();

	return defineMethods({
		useRouteCreator: function <
			Method extends HttpMethod,
			Url extends RestSchemaUrls<MethodRoutes<B, Method>>
		>(method: Method, url: Url): ServerRepliesCreator<B, Url, Method> {
			const routeCreator = {} as ServerRepliesCreator<B, Url, Method>;
			for (const [code, { data, statusCode }] of Object.entries(
				this.schemaBlueprint[url]![method]!.replies
			)) {
				if (data === null) {
					(routeCreator as any)[code] = () => ({
						statusCode,
						code,
						data: null,
					});
				} else {
					(routeCreator as any)[code] = (data: unknown) => ({
						statusCode,
						code,
						data,
					});
				}
			}

			return routeCreator;
		},
		fastifyRoute: function <
			Method extends HttpMethod,
			Url extends RestSchemaUrls<MethodRoutes<B, Method>>
		>(
			method: Method,
			url: Url
		): ServerRepliesCreator<B, Url, Method> & {
			route: {
				method: Uppercase<Method>;
				url: Url;
			};
		} {
			const routeCreator = this.useRouteCreator(method, url);
			return Object.assign(routeCreator, {
				route: {
					method: method.toUpperCase() as Uppercase<Method>,
					url,
				},
			});
		},
	});
}
