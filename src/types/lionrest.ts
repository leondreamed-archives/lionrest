import type { RemovePrivateProperties } from 'liontypes';

import type { InternalLionrestProperties } from './properties';
import type { BaseRestSchema } from './schema';

export type InternalLionrestState<_R extends BaseRestSchema> = {};

export interface InternalLionrest<R extends BaseRestSchema>
	extends InternalLionrestState<R>,
		InternalLionrestProperties<R> {}

export interface Lionrest<R extends BaseRestSchema>
	extends RemovePrivateProperties<InternalLionrest<R>> {}
