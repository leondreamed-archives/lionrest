import type {
	RestSchemaBlueprint,
	RestSchemaTypeFromBlueprint,
} from './blueprint';
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

export type BaseReplyMap = Record<string, ReplyData<number, unknown | null>>;

export type MapRepliesToReplyCreator<Replies extends BaseReplyMap> = {
	[R in keyof Replies]: Replies[R]['data'] extends null
		? () => {
				code: R;
				statusCode: Replies[R]['statusCode'];
				data: null;
		  }
		: <D extends Replies[R]['data']>(
				data: D
		  ) => {
				code: R;
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
