import fetch, { Headers, Request } from 'node-fetch';

(globalThis.fetch as any) = fetch;
(globalThis.Request as any) = Request;
globalThis.Headers = Headers;
