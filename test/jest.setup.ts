import fetch, { Headers, Request } from 'node-fetch';

// Stuff needed for ky to work
(globalThis.fetch as any) = fetch;
(globalThis.Request as any) = Request;
globalThis.Headers = Headers;
