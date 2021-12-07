import type { BaseRestSchema } from '../../types/schema';
import { useDefineMethods } from '../../utils/methods';

export function replyModule<R extends BaseRestSchema>() {
	const defineMethods = useDefineMethods<R>();

	return defineMethods({
		a() {}
	});
}
