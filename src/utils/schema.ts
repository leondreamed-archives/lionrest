import type {
	Static,
	TObject,
	TOptional,
	TProperties,
	TSchema,
	TString,
} from '@sinclair/typebox';

import type { ReplyData } from '../types/reply';



export function defRestSchema<B extends RestSchemaBlueprint>(
	restSchemaBlueprint: B
): B {
	return restSchemaBlueprint;
}
