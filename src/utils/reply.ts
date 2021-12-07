import type { ReplyData } from '../types/reply';

export function defReply<Data extends Record<string, unknown>>() {
	return {
		statusCode: function <StatusCode extends number>(
			statusCode: StatusCode
		): ReplyData<StatusCode, Data> {
			return {
				statusCode,
				data: undefined as any,
			};
		},
	};
}

export function defNullReply() {
	return {
		statusCode: function <StatusCode extends number>(
			statusCode: StatusCode
		): ReplyData<StatusCode> {
			return {
				statusCode,
				data: null,
			};
		},
	};
}
