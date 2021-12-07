import type ky from 'ky';
import type { RemovePrivateProperties } from 'liontypes';

import type { RestSchemaBlueprint } from '~/utils/schema';

import type { InternalLionrestProperties } from './properties';

export type InternalLionrestState<R extends RestSchemaBlueprint> = {
	ky: typeof ky;
	schemaBlueprint: R;
};

export interface InternalLionrest<R extends RestSchemaBlueprint>
	extends InternalLionrestState<R>,
		InternalLionrestProperties<R> {}

export interface Lionrest<R extends RestSchemaBlueprint>
	extends RemovePrivateProperties<InternalLionrest<R>> {}
