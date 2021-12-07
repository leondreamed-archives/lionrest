import type { RemovePrivateProperties } from 'liontypes';

export type InternalLionrestState<R extends RestSchema> = {};

export interface InternalLionrest<R extends RestSchema>
	extends InternalLionrestState<R>,
		InternalLionrestProperties<R> {}

export interface Lionecs<S extends RestSchema>
	extends RemovePrivateProperties<InternalLionrest<S>> {}
