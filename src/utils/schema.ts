import { Type, Static } from 'typebox';

import type { BaseReply, Reply } from '../types/reply';
import type { BaseRestSchema, BaseRouteSchema } from '../types/schema';
import { defReply } from './reply';

export function defRestSchema<R extends BaseRestSchema>(restSchema: R) {
	return restSchema;
}

export function defRouteSchema<R extends BaseRouteSchema>(): R {
	return undefined as any;
}

export function defReply<R extends BaseReply>(): Reply<
	R['code'],
	R['statusCode'],
	R['data']
> {
	return undefined as any;
}

export function defBody<B>(body: B): Static<B> {
	return undefined as any;
}

export function defRoute<R extends >

const mySchema = defRestSchema({
	'/route1': {
		get: {
			headers: {
				'x-my-header': Type.String(),
			},
			searchParams: {
				query: Type.String(),
			},
			reply: defReply<{
				code: 'success';
				data: null;
				statusCode: 200;
			}>(),
		},
		post: {
			headers: {
				'x-my-header': Type.String(),
			},
			body: defBody(
				Type.Object({
					username: Type.String(),
				})
			),
			reply: defReply<{
				code: 'failure';
				data: null;
				statusCode: 403;
			}>(),
		},
	},
});

export type MySchema = typeof mySchema;
