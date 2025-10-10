// src/lib/route-metrics.tsx
'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { track } from './rum';


export function useRouteMetrics() {
const pathname = usePathname();
const t0 = useRef<number | null>(null);


useEffect(() => {
t0.current = performance.now();
requestAnimationFrame(() => {
if (t0.current) {
track({ kind: 'route', path: pathname, dt_first_paint: performance.now() - t0.current });
}
});
}, [pathname]);
}