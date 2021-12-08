import type ky from 'ky';
import { createInstance, retrieveModuleProperties } from 'lion-architecture';

import type { RestSchemaBlueprint } from '~/types/blueprint';

import * as lionrestModules from '../modules';
import type { InternalLionrestState, Lionrest } from '../types/lionrest';
import type { InternalLionrestProperties } from '../types/properties';

const lionrestProperties = retrieveModuleProperties(
	lionrestModules
) as InternalLionrestProperties<any>;

type CreateLionrestProps<B extends RestSchemaBlueprint> = {
	schema: B;
	ky?: typeof ky;
};

export function createLionrest<B extends RestSchemaBlueprint>(
	props: CreateLionrestProps<B>
) {
	const internalState: InternalLionrestState<B> = {
		schemaBlueprint: props.schema,
		ky: props.ky,
	};

	const lionrest = createInstance(
		lionrestProperties,
		internalState
	) as Lionrest<B>;

	return lionrest;
}
