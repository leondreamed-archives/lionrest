import ky from 'ky';

import { createLionrest, defReply, defRestSchema } from '~/index';

const schema = defRestSchema({
	'/todos': {
		get: {
			replies: {
				todos: defReply<{
					userId: number;
					id: number;
					title: string;
					completed: boolean;
				}>().statusCode(200),
			},
		},
	},
});

const apiKy = ky.extend({
	prefixUrl: 'https://jsonplaceholder.typicode.com',
});

const lr = createLionrest({
	ky: apiKy,
	schema,
});

test('creates', async () => {
	console.log(await lr.get('/todos').json());
});
