type BaseHeaders = Record<string, string>;
type BaseSearchParams = Record<string, string>;
type BaseReply = {
	code: string;
	statusCode: number;
	data: Record<string, unknown> | null;
};
type BaseBody = Record<string, unknown>;

export type BaseGetSchema = {
	headers: BaseHeaders;
	searchParams: BaseSearchParams;
	reply: BaseReply;
};

export type BaseNonGetSchema = {
	headers: BaseHeaders;
	body: BaseBody;
	reply: BaseReply;
};

export type BasePostSchema = BaseNonGetSchema;
export type BasePutSchema = BaseNonGetSchema;
export type BasePatchSchema = BaseNonGetSchema;
export type BaseDeleteSchema = BaseNonGetSchema;

export type PostSchema<Schema extends BasePostSchema> = Schema;
export type PutSchema<Schema extends BasePutSchema> = Schema;
export type PatchSchema<Schema extends BasePatchSchema> = Schema;
export type DeleteSchema<Schema extends BaseDeleteSchema> = Schema;

export type BaseRouteSchema = {
	get?: BaseGetSchema;
	post?: BasePostSchema;
	put?: BasePutSchema;
	patch?: BasePatchSchema;
	delete?: BaseDeleteSchema;
};

export type RouteSchema<Schema extends BaseRouteSchema> = Schema;

export type BaseRestSchema = {
	[k: string]: BaseRouteSchema;
};

export type RestSchema<Schema extends BaseRestSchema = any> = Schema;

/**
 *	@example
 *	type MySchema = RestSchema<{
 *		'/route1': {
 *			get: {
 *				searchParams: {
 *					query: string;
 *				};
 *				headers: {
 *					'x-my-header': string;
 *				};
 *				reply: {
 *					code: 'success';
 *					data: null;
 *					statusCode: 200;
 *				};
 *			};
 *			post: {
 *				body: {
 *					username: string,
 *				},
 *				headers: {
 *					'x-my-header': string,
 *				},
 *				reply: {
 *					code: 'failure',
 *					data: null,
 *					statusCode: 403
 *				}
 *			};
 *		};
 *	}>;
*/

export function createLionrest<R extends RestSchema<any>>() {}
