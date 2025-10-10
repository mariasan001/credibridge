// src/lib/rum-context.ts
import { track } from './rum';


let pushed = false;
export function pushClientContextOnce() {
if (pushed) return; pushed = true;
const nav = (navigator as any);
try {
track({
kind: 'context',
ua: navigator.userAgent,
lang: navigator.language,
w: window.innerWidth, h: window.innerHeight,
conn: nav?.connection?.effectiveType,
mem: (performance as any).memory?.jsHeapSizeLimit
});
} catch {}
}