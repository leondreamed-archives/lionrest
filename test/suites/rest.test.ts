import ky from 'ky';

import { createLionrest, defReply, defRestSchema } from '~/index';
import { defUrlParam } from '~/utils/reply';

type Todo = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

const schema = defRestSchema({
	'/todos': {
		get: {
			replies: {
				todos: defReply<Todo[]>().statusCode(200),
			},
		},
	},
	'/todos/{id}': {
		get: {
			urlParams: {
				id: defUrlParam<number>(),
			},
			replies: {
				todo: defReply<Todo>().statusCode(200),
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
