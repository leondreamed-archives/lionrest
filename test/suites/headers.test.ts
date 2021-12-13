import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';

import { createLionrest, defNullReply, defReply, defRestSchema } from '~/index';
import type {
	GetRouteMethodBlueprint,
	NonGetRouteMethodBlueprint,
} from '~/types/blueprint';

function getWithAuth<R extends GetRouteMethodBlueprint>(methodRoute: R) {
	return {
		...methodRoute,
		headers: Type.Object({
			Authorization: Type.String(),
		}),
		replies: {
			...methodRoute.replies,
			notAuthorized: defNullReply().statusCode(404),
		},
	};
}

function nonGetWithAuth<R extends NonGetRouteMethodBlueprint>(methodRoute: R) {
	return {
		...methodRoute,
		headers: Type.Object({
			Authorization: Type.String(),
		}),
		replies: {
			...methodRoute.replies,
			notAuthorized: defNullReply().statusCode(404),
		},
	};
}

const Profile = Type.Object({
	username: Type.String(),
	avatarUrl: Type.String(),
});

type Profile = Static<typeof Profile>;

const schema = defRestSchema({
	'/profile': {
		get: getWithAuth({
			replies: {
				profile: defReply<Profile>().statusCode(200),
			},
		}),
		post: nonGetWithAuth({
			body: Profile,
			replies: {
				profile: defReply<Profile>().statusCode(200),
			},
		}),
		patch: nonGetWithAuth({
			body: Type.Optional(Profile),
			replies: {
				profile: defReply<Profile>().statusCode(200),
			},
		}),
	},
});

test('works', () => {
	createLionrest({ schema });
});
