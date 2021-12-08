import type { UrlParam } from '~/types/schema';

import type { ReplyData } from '../types/reply';

export function defReply<Data>() {
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

export function defUrlParam<T extends UrlParam>(): T {
	return undefined as any;
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
