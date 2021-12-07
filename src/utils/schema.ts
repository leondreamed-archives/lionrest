import type {
	Static,
	TObject,
	TOptional,
	TProperties,
	TSchema,
	TString,
} from '@sinclair/typebox';

import type { BaseReplies, Reply } from '../types/reply';

export type RestSchemaTypeFromBlueprint<R extends RestSchemaBlueprint> = {
	[Route in keyof R]: {
		[RouteMethod in keyof R[Route]]: R[Route][RouteMethod] extends RouteMethodBlueprint
			? Omit<R[Route][RouteMethod], 'headers' | 'searchParams' | 'body'> & {
					headers: Static<R[Route][RouteMethod]['headers']>;
			  } & (R[Route][RouteMethod] extends GetRouteMethodBlueprint
						? { searchParams: Static<R[Route][RouteMethod]['searchParams']> }
						: R[Route][RouteMethod] extends NonGetRouteMethodBlueprint
						? { body: Static<R[Route][RouteMethod]['body']> }
						: never)
			: never;
	};
};

export function defRestSchema<B extends RestSchemaBlueprint>(
	restSchema: B
): RestSchemaTypeFromBlueprint<B> {
	return restSchema;
}

type MapTypedReplies<T extends BaseReplies> = {
	[R in keyof T & number]: Reply<
		T[R]['code'],
		T[R]['statusCode'],
		T[R]['data']
	>;
};
export function defReplies<R extends BaseReplies>(): MapTypedReplies<R> {
	return undefined as any;
}

export type RouteMethodBlueprint = {
	/**
	 *	@example
	 *	Type.Object({
	 *		'x-required-header': Type.String()
	 *		'x-optional-header': Type.Optional(Type.String())
	 *	})
	 */
	headers: TObject<{
		[header: string]: TString | TOptional<TString>;
	}>;
	replies: BaseReplies;
};

export type GetRouteMethodBlueprint = RouteMethodBlueprint & {
	searchParams: TObject<TProperties>;
};

export type NonGetRouteMethodBlueprint = RouteMethodBlueprint & {
	body: TSchema;
};

export type RouteBlueprint = {
	get?: GetRouteMethodBlueprint;
	post?: NonGetRouteMethodBlueprint;
	put?: NonGetRouteMethodBlueprint;
	patch?: NonGetRouteMethodBlueprint;
	delete?: NonGetRouteMethodBlueprint;
};

export type RestSchemaBlueprint = {
	[route: string]: RouteBlueprint;
};
