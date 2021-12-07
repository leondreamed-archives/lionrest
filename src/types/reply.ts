import type { HttpMethod } from './method';
import type { BaseRestSchema, BaseRouteMethodSchema } from './schema';

export interface Reply<
	Code extends string,
	StatusCode extends number,
	Data extends unknown | null = null
> {
	code: Code;
	statusCode: StatusCode;
	data: Data;
}

export type BaseReplies = Reply<string, number, unknown | null>[];

export type MapRepliesToReplyCreator<Replies extends BaseReplies> = {
	[R in keyof Replies & number]: Replies[R]['data'] extends null
		? () => {
				code: Replies[R]['code'];
				statusCode: Replies[R]['statusCode'];
				data: null;
		  }
		: <D extends Replies[R]['data']>(
				data: D
		  ) => {
				code: Replies[R]['code'];
				statusCode: Replies[R]['statusCode'];
				data: D;
		  };
};

export type ServerRepliesCreator<
	R extends BaseRestSchema,
	Url extends string,
	Method extends HttpMethod
> = R[Url][Method] extends BaseRouteMethodSchema
	? MapRepliesToReplyCreator<R[Url][Method]['replies']>
	: never;
