import { ServerReply } from './types';

export type InvalidEmailOrPassword = ServerReply<'INVALID_EMAIL_OR_PASSWORD'>;
export type EmailAlreadyUsed = ServerReply<'EMAIL_ALREADY_USED'>;
