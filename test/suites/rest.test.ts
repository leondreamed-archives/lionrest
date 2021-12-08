import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import ky from 'ky';

import { createLionrest, defReply, defRestSchema } from '~/index';
import { defNullReply, defUrlParam } from '~/utils/reply';

const Post = Type.Object({
	id: Type.String(),
	userId: Type.Number(),
	title: Type.String(),
	body: Type.String(),
});

const CreatePost = Type.Omit(Post, ['id']);

type Post = Static<typeof Post>;

type PostComment = {
	userId: number;
	id: number;
	name: string;
	email: string;
	body: string;
};

const schema = defRestSchema({
	'/posts': {
		get: {
			replies: {
				posts: defReply<Post[]>().statusCode(200),
			},
		},
		post: {
			body: CreatePost,
			replies: {
				post: defReply<Post>().statusCode(200),
			},
		},
	},
	'/posts/{id}': {
		urlParams: {
			id: defUrlParam<number>(),
		},
		get: {
			replies: {
				post: defReply<Post>().statusCode(200),
			},
		},
		put: {
			body: Post,
			replies: {
				post: defReply<Post>().statusCode(200),
			},
		},
		patch: {
			body: Type.Optional(Post),
			replies: {
				post: defReply<Post>().statusCode(200),
			},
		},
		delete: {
			replies: {
				success: defNullReply().statusCode(200),
			},
		},
	},
	'/posts/{id}/comments': {
		urlParams: {
			id: defUrlParam<number>(),
		},
		get: {
			replies: {
				comments: defReply<PostComment[]>().statusCode(200),
			},
		},
	},
	'/comments': {
		get: {
			searchParams: Type.Object({
				postId: Type.Number(),
			}),
			replies: {
				comments: defReply<PostComment[]>().statusCode(200),
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
	console.log(await lr.get('/posts/{id}', { urlParams: { id: 1 } }).json());
});
