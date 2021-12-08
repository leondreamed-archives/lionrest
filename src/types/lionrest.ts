import type ky from 'ky';
import type { RemovePrivateProperties } from 'liontypes';

import type { RestSchemaBlueprint } from './blueprint';
import type { InternalLionrestProperties } from './properties';

export type InternalLionrestState<B extends RestSchemaBlueprint> = {
	ky?: typeof ky;
	schemaBlueprint: B;
};

export interface InternalLionrest<B extends RestSchemaBlueprint>
	extends InternalLionrestState<B>,
		InternalLionrestProperties<B> {}

export interface Lionrest<B extends RestSchemaBlueprint>
	extends RemovePrivateProperties<InternalLionrest<B>> {}
