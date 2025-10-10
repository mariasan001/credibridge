// src/lib/usePerfMark.ts
import { useEffect } from 'react';
import { track } from './rum';


export function usePerfMark(name: string) {
useEffect(() => {
const t0 = performance.now();
return () => {
track({ kind:'component', name, mount_ms: performance.now() - t0 });
};
}, [name]);
}