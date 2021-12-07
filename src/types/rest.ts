import ky from 'ky';

interface RouteSchema<Body extends Record<string, unknown>> {}

/**
 * Map of URLs to schemas:
 * {
 *   '/login': Schema<{ Body: { email: string, password: string } }>
 *   '/register': Schema<{ Body: { email: string, password: string } }>
 * }
 */
export interface RestSchema<Headers extends Record<string, string> = Record<string, string>>
	extends Record<string, RouteSchema<any>> {}

export type RestSchemaHeaders<R extends RestSchema<any>> = R extends RestSchema<
	infer Headers
>
	? Headers
	: never;

export function createLionrest<R extends RestSchema<any>>() {}
