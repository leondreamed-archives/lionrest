# LionREST

LionREST provides a simple way to define a type-safe REST API in TypeScript **without the need for code generation.**

While OpenAPI and the like are great for larger projects, they ultimately add a ton of complexity to your workflow. In addition, the schema definition language is too verbose for simpler projects when all you want is type safety in your REST API.

Example usage (with https://jsonplaceholder.typicode.com/):

```typescript
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

const rest = createLionrest({
	ky: apiKy,
	schema,
});

test('successfully retrieves data', async () => {
	const post = await rest.get('/posts/{id}', { urlParams: { id: 1 } }).json();
	expect(post.id).toBe(1);
});
```