import type {
	Static,
	TObject,
	TOptional,
	TProperties,
	TSchema,
	TString,
} from '@sinclair/typebox';

import type { ReplyData } from './reply';

export type RouteMethodBlueprintHeaders = TObject<{
	[header: string]: TString | TOptional<TString>;
}>;

export type RouteMethodBlueprintSearchParams = TObject<TProperties>;
export type RouteMethodBlueprintUrlParams = Record<string, unknown>;
export type RouteMethodBlueprintBody = TSchema;

export type RouteMethodBlueprint = {
	/**
	 *	@example
	 *	Type.Object({
	 *		'x-required-header': Type.String()
	 *		'x-optional-header': Type.Optional(Type.String())
	 *	})
	 */
	headers?: RouteMethodBlueprintHeaders;
	urlParams?: RouteMethodBlueprintUrlParams;
	replies: {
		[replyCode: string]: ReplyData<number, unknown>;
	};
};

export type GetRouteMethodBlueprint = RouteMethodBlueprint & {
	searchParams?: RouteMethodBlueprintSearchParams;
};

export type NonGetRouteMethodBlueprint = RouteMethodBlueprint & {
	body: RouteMethodBlueprintBody;
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

export type RestSchemaTypeFromBlueprint<B extends RestSchemaBlueprint> = {
	[Route in keyof B]: {
		[RouteMethod in keyof B[Route]]: B[Route][RouteMethod] extends RouteMethodBlueprint
			? Omit<B[Route][RouteMethod], 'headers' | 'searchParams' | 'body'> &
					(B[Route][RouteMethod] extends {
						headers: RouteMethodBlueprintHeaders;
					}
						? {
								headers: Static<B[Route][RouteMethod]['headers']>;
						  }
						: Record<never, never>) &
					(B[Route][RouteMethod] extends GetRouteMethodBlueprint
						? B[Route][RouteMethod] extends {
								searchParams: RouteMethodBlueprintSearchParams;
						  }
							? {
									searchParams: Static<B[Route][RouteMethod]['searchParams']>;
							  }
							: Record<never, never>
						: B[Route][RouteMethod] extends NonGetRouteMethodBlueprint
						? { body: Static<B[Route][RouteMethod]['body']> }
						: never)
			: never;
	};
};
