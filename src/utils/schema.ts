import type { BaseRestSchema, BaseRouteSchema } from '../types/schema';

export function defRestSchema<R extends BaseRestSchema>(restSchema: R) {
	return restSchema;
}

export function defRouteSchema<R extends BaseRouteSchema>(): R {
	return undefined as any;
}

export const mySchema = defRestSchema({
	'/route1': defRouteSchema<{
		get: {
			searchParams: {
				query: string;
			};
			headers: {
				'x-my-header': string;
			};
			reply: {
				code: 'success';
				data: null;
				statusCode: 200;
			};
		};
		post: {
			body: {
				username: string;
			};
			headers: {
				'x-my-header': string;
			};
			reply: {
				code: 'failure';
				data: null;
				statusCode: 403;
			};
		};
	}>(),
});
export type MySchema = typeof mySchema;