import type { RestSchemaBlueprint } from '~/types/blueprint';

export function defRestSchema<B extends RestSchemaBlueprint>(
	restSchemaBlueprint: B
): B {
	return restSchemaBlueprint;
}
