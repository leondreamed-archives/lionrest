import type { RemovePrivateProperties } from 'liontypes';

import type { EntityKey } from '.';
import type { ComponentKey, ComponentMap } from './component';
import type {
	ComponentStateListenerContext,
	EntityStateListenerContext,
	StateListener,
} from './context';
import type { Entity } from './entity';
import type { InternalLionecsProperties } from './properties';
import type { RestSchema } from './rest';
import type { LionecsExtras, LionecsState, StateUpdate } from './state';

export type InternalLionrestState<S extends RestSchema> = {};

export interface InternalLionrest<S extends RestSchema>
	extends InternalLionrestState<S>,
		InternalLionrestProperties<S> {}

export interface Lionecs<S extends RestSchema>
	extends RemovePrivateProperties<InternalLionrest<S>> {}
