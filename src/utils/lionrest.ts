import type ky from 'ky';
import { createInstance, retrieveModuleProperties } from 'lion-architecture';

import * as lionrestModules from '../modules';
import type { InternalLionrestState, Lionrest } from '../types/lionrest';
import type { InternalLionrestProperties } from '../types/properties';
import type { BaseRestSchema } from '../types/schema';

const lionrestProperties = retrieveModuleProperties(
	lionrestModules
) as InternalLionrestProperties<any>;

type CreateLionrestProps<R extends BaseRestSchema> = {
	schema: R;
	ky: typeof ky;
};

export function createLionrest<R extends BaseRestSchema>(
	props: CreateLionrestProps<R>
) {
	const internalState: InternalLionrestState<R> = {
		ky: props.ky,
		schema: props.schema,
	};

	const lionrest = createInstance(
		lionrestProperties,
		internalState
	) as Lionrest<R>;

	return lionrest;
}
