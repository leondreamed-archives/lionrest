import type ky from 'ky';
import type { RemovePrivateProperties } from 'liontypes';

import type { InternalLionrestProperties } from './properties';
import type { BaseRestSchema } from './schema';

export type InternalLionrestState<R extends BaseRestSchema> = {
	ky: typeof ky;
	schema: R;
};

export interface InternalLionrest<R extends BaseRestSchema>
	extends InternalLionrestState<R>,
		InternalLionrestProperties<R> {}

export interface Lionrest<R extends BaseRestSchema>
	extends RemovePrivateProperties<InternalLionrest<R>> {}
