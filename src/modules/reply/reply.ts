import type { HttpMethod } from '~/types/method';
import type { ServerRepliesCreator } from '~/types/reply';
import type { RestSchemaBlueprint } from '~/utils/schema';

import { useDefineMethods } from '../../utils/methods';

export function replyModule<B extends RestSchemaBlueprint>() {
	const defineMethods = useDefineMethods<B>();

	return defineMethods({
		useReplyCreator: function <Method extends HttpMethod, Url extends string>(
			method: Method,
			url: Url
		): ServerRepliesCreator<B, Url, Method> {
			const serverReplies = {} as ServerRepliesCreator<B, Url, Method>;
			for (const [code, { data, statusCode }] of Object.entries(
				this.schemaBlueprint[url]![method]!.replies
			)) {
				if (data === null) {
					(serverReplies as any)[code] = () => ({
						statusCode,
						code,
						data: null,
					});
				} else {
					(serverReplies as any)[code] = (data: unknown) => ({
						statusCode,
						code,
						data,
					});
				}
			}
			return serverReplies;
		},
	});
}
