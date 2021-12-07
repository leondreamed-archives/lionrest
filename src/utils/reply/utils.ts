import type { ReplyBlueprint, ServerRepliesCreator } from './types';

/**
 * Example:
 * replyBlueprints: [ServerReply<'invalid', 403>, ServerReply<'success', 200, { token: string }>]
 * returns: {
 *   invalid: () => ({
 *     code: 'invalid',
 *     statusCode: 403,
 *     data: null
 *   }),
 *   success: (data: { token: string }) => ({
 *     code: 'success',
 *     statusCode: 200,
 *     data,
 *   })
 * }
 */
export function defReplyCreator<
	ReplyBlueprints extends ReplyBlueprint<string, number, unknown>[]
>(replyBlueprints: ReplyBlueprints): ServerRepliesCreator<ReplyBlueprints> {
	const serverReplies = {} as ServerRepliesCreator<ReplyBlueprints>;
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
}

export function defReply<Code extends string, StatusCode extends number>(
	code: Code,
	statusCode: StatusCode
) {
	return {
		data<Data>(): ReplyBlueprint<Code, StatusCode, Data> {
			return {
				code,
				statusCode,
				hasData: true as any,
			};
		},
		noData(): ReplyBlueprint<Code, StatusCode, null> {
			return {
				code,
				statusCode,
				hasData: false,
			};
		},
	};
}
