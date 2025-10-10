// src/lib/perf-observers.ts
import { track } from './rum';


export function initPerfObservers() {
// Long tasks (>50ms)
try {
new PerformanceObserver((list) => {
for (const e of list.getEntries()) {
track({ kind: 'longtask', name: e.name, dt: e.duration, start: e.startTime });
}
}).observe({ type: 'longtask', buffered: true } as any);
} catch {}


// Recursos “lentos” (imágenes/scripts)
try {
new PerformanceObserver((list) => {
for (const e of list.getEntries()) {
const r = e as PerformanceResourceTiming;
if (r.initiatorType && r.duration > 300) {
track({
kind: 'resource',
type: r.initiatorType,
name: r.name,
dur: r.duration,
ttfb: r.responseStart - r.requestStart,
transfer: r.transferSize
});
}
}
}).observe({ type: 'resource', buffered: true } as any);
} catch {}
}