import { ServerReply } from './types';

export type Success = ServerReply<'SUCCESS'>;
export type Failure = ServerReply<'FAILURE'>;
