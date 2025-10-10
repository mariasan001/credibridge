
// app/RUMInit.tsx
'use client';

import { useEffect } from "react";
import { initWebVitals } from "@/lib/webvitals";
import { initPerfObservers } from "@/lib/perf-observers";
import { pushClientContextOnce } from "@/lib/rum-context";

export default function RUMInit() {
  useEffect(() => {
    pushClientContextOnce();
    initWebVitals();
    initPerfObservers();
  }, []);

  return null;
}
