import { createInstance, retrieveModuleProperties } from 'lion-architecture';

import * as lionrestModules from '../modules';
import * as lionecsModules from '../modules';
import type { ComponentKey, ComponentMap } from '../types/component';
import type { EntityMap } from '../types/entity';
import type { InternalLionecsState, Lionecs } from '../types/lionecs';
import type { InternalLionrestState, Lionrest } from '../types/lionrest';
import type {
	InternalLionecsProperties,
	InternalLionrestProperties,
} from '../types/properties';
import type { BaseRestSchema } from '../types/schema';
import type { LionecsExtras, LionecsState } from '../types/state';

const lionrestProperties = retrieveModuleProperties(
	lionrestModules
) as InternalLionrestProperties<any>;

export function createLionrest<R extends BaseRestSchema>(schema: R) {
	const internalState: InternalLionrestState<R> = {};

	const lionrest = createInstance(
		lionrestProperties,
		internalState
	) as Lionrest<R>;

	return lionrest;
}
