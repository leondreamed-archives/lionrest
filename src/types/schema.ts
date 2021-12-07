import type { Reply } from './reply';

type BaseHeaders = Record<string, string>;
type BaseSearchParams = Record<string, string>;
type BaseReply = Reply<string, number, Record<string, unknown> | null>;
type BaseBody = Record<string, unknown>;

export type BaseRouteMethodSchema = {
	headers: BaseHeaders;
	reply: BaseReply;
};

export type BaseGetSchema = BaseRouteMethodSchema & {
	searchParams: BaseSearchParams;
};

export type BaseNonGetSchema = BaseRouteMethodSchema & {
	body: BaseBody;
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
