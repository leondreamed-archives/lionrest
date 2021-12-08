import type { BaseReplyMap } from './reply';

export type BaseHeaders = Record<string, string>;
export type BaseSearchParams = Record<string, string>;
export type BaseBody = Record<string, unknown>;
export type BaseUrlParams = Record<string, UrlParam>;
export type UrlParam = string | number;

export type BaseRouteMethodSchema = {
	headers?: BaseHeaders;
	replies?: BaseReplyMap;
};

export type BaseGetSchema = BaseRouteMethodSchema & {
	searchParams?: BaseSearchParams;
};

export type BaseNonGetSchema = BaseRouteMethodSchema & {
	body?: BaseBody;
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
	urlParams?: BaseUrlParams;
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

export type RestSchema<Schema extends BaseRestSchema> = Schema;
