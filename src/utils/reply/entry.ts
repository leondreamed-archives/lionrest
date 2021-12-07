import { EmailAlreadyUsed, InvalidEmailOrPassword } from './credentials';
import { Success } from './generic';

export const entryReplies = defReplyCreator([
	defReply('success', 200).data<{ token: string }>(),
	defReply('invalidUsernameOrPassword', 403).noData(),
]);
