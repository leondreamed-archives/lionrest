import { Type } from '@sinclair/typebox';

const mySchema = defRestSchema({
	'/route1': {
		get: {
			headers: Type.Object({
				'x-my-header': Type.String(),
			}),
			searchParams: Type.Object({
				query: Type.String(),
			}),
			reply: defReply<{
				code: 'success';
				data: null;
				statusCode: 200;
			}>(),
		},
		post: {
			headers: Type.Object({
				'x-my-header': Type.String(),
			}),
			body: Type.Object({
				username: Type.String(),
			}),
			reply: defReply<{
				code: 'failure';
				data: null;
				statusCode: 403;
			}>(),
		},
	},
});

export type MySchema = typeof mySchema;
