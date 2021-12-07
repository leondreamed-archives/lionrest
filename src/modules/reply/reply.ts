import type { HttpMethod } from '~/types/method';
import type { ServerRepliesCreator } from '~/types/reply';

import type { BaseRestSchema } from '../../types/schema';
import { useDefineMethods } from '../../utils/methods';

export function replyModule<R extends BaseRestSchema>() {
	const defineMethods = useDefineMethods<R>();

	return defineMethods({
		getReplyCreator: function <Method extends HttpMethod, Url extends string>(
			method: Method,
			url: Url
		): ServerRepliesCreator<R, Url, Method> {
			const serverReplies = {} as ServerRepliesCreator<R, Url, Method>;
			for (const replyBlueprint of replyBlueprints) {
				if (replyBlueprint.hasData) {
					(serverReplies as any)[replyBlueprint.code] = (data: unknown) => ({
						statusCode: replyBlueprint.statusCode,
						code: replyBlueprint.code,
						data,
					});
				} else {
					(serverReplies as any)[replyBlueprint.code] = () => ({
						statusCode: replyBlueprint.statusCode,
						code: replyBlueprint.code,
						data: null,
					});
				}
			}
			return serverReplies;
		},
	});
}
