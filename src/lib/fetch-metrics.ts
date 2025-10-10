// src/lib/fetch-metrics.ts
import { track } from './rum';


export async function mfetch(input: RequestInfo | URL, init?: RequestInit) {
const t0 = performance.now();
try {
const res = await fetch(input, init);
track({ kind: 'api', url: String((res as any).url || input), status: res.status, dt: performance.now() - t0 });
return res;
} catch (e) {
track({ kind: 'api', url: String(input), status: 0, error: true, dt: performance.now() - t0 });
throw e;
}
}