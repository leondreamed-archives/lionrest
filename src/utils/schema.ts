import type {
	Static,
	TObject,
	TOptional,
	TProperties,
	TSchema,
	TString,
} from '@sinclair/typebox';

import type { ReplyData } from '../types/reply';

export type RestSchemaTypeFromBlueprint<B extends RestSchemaBlueprint> = {
	[Route in keyof B]: {
		[RouteMethod in keyof B[Route]]: B[Route][RouteMethod] extends RouteMethodBlueprint
			? Omit<B[Route][RouteMethod], 'headers' | 'searchParams' | 'body'> & {
					headers: Static<NonNullable<B[Route][RouteMethod]['headers']>>;
			  } & (B[Route][RouteMethod] extends GetRouteMethodBlueprint
						? {
								searchParams: Static<
									NonNullable<B[Route][RouteMethod]['searchParams']>
								>;
						  }
						: B[Route][RouteMethod] extends NonGetRouteMethodBlueprint
						? { body: Static<B[Route][RouteMethod]['body']> }
						: never)
			: never;
	};
};

export function defRestSchema<B extends RestSchemaBlueprint>(
	RestSchemaBlueprint: B
): B {
	return RestSchemaBlueprint;
}

export type RouteMethodBlueprint = {
	/**
	 *	@example
	 *	Type.Object({
	 *		'x-required-header': Type.String()
	 *		'x-optional-header': Type.Optional(Type.String())
	 *	})
	 */
	headers?: TObject<{
		[header: string]: TString | TOptional<TString>;
	}>;
	urlParams?: Record<string, unknown>;
	replies: {
		[replyCode: string]: ReplyData<number, unknown>;
	};
};

export type GetRouteMethodBlueprint = RouteMethodBlueprint & {
	searchParams?: TObject<TProperties>;
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
