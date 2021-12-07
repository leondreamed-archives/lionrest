import type { RestSchema } from '../../types/rest';
import { useDefineMethods } from '../../utils/methods';

export function replyModule<R extends RestSchema>() {
	const defineMethods = useDefineMethods<R>();

	return defineMethods({});
}
