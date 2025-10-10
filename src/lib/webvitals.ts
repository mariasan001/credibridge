// lib/webvitals.ts
import { onLCP, onINP, onCLS } from 'web-vitals/attribution';
import { track } from './rum';

function safeAttr(a: unknown) {
  try { return JSON.parse(JSON.stringify(a)); } catch { return undefined; }
}

export function initWebVitals() {
  onLCP((m) => track({ kind: 'vital', name: 'LCP', value: m.value, attribution: safeAttr(m.attribution) }));
  onINP((m) => track({ kind: 'vital', name: 'INP', value: m.value, attribution: safeAttr(m.attribution) }));
  onCLS((m) => track({ kind: 'vital', name: 'CLS', value: m.value, attribution: safeAttr(m.attribution) }));
}
