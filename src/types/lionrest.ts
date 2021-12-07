import type { RemovePrivateProperties } from 'liontypes';

import type { InternalLionrestProperties } from './properties';
import type { RestSchema } from './rest';

export type InternalLionrestState<_R extends RestSchema> = {};

export interface InternalLionrest<R extends RestSchema>
	extends InternalLionrestState<R>,
		InternalLionrestProperties<R> {}

export interface Lionecs<S extends RestSchema>
	extends RemovePrivateProperties<InternalLionrest<S>> {}
