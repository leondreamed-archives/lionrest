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
			for (const [code, { data, statusCode }] of Object.entries(
				this.schema[url]![method]!.replies
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
