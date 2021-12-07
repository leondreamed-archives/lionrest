import type {
	RestSchemaBlueprint,
	RestSchemaTypeFromBlueprint,
} from '~/utils/schema';

import type { HttpMethod } from './method';
import type { BaseRouteMethodSchema } from './schema';

export interface ReplyData<
	StatusCode extends number,
	Data extends unknown | null = null
> {
	statusCode: StatusCode;
	data: Data;
}

export interface Reply<
	Code extends string,
	StatusCode extends number,
	Data extends unknown | null = null
> extends ReplyData<StatusCode, Data> {
	code: Code;
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
	B extends RestSchemaBlueprint,
	Url extends string,
	Method extends HttpMethod
> = RestSchemaTypeFromBlueprint<B>[Url][Method] extends BaseRouteMethodSchema
	? MapRepliesToReplyCreator<
			RestSchemaTypeFromBlueprint<B>[Url][Method]['replies']
	  >
	: never;
