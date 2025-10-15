// app/RUMInit.tsx
"use client";

import { useEffect } from "react";
import { initWebVitals } from "@/lib/webvitals";
import { initPerfObservers } from "@/lib/perf-observers";
import { pushClientContextOnce } from "@/lib/rum-context";

export default function RUMInit() {
  useEffect(() => {
    pushClientContextOnce();
    initWebVitals();
    initPerfObservers();

    // Evitar doble parche con HMR
    const w = window as any;
    if (!w.__rejectPatchApplied) {
      const oldReject = Promise.reject.bind(Promise);
      // parche: log cuando rechazan con null/undefined/obj vacío
      // @ts-ignore
      Promise.reject = (reason: any) => {
        const isEmptyObject =
          reason && typeof reason === "object" && Object.keys(reason).length === 0;
        if (reason == null || isEmptyObject) {
          // stack artificial para ubicar quién llamó reject(...)
          // eslint-disable-next-line no-console
          console.error("[REJECT NULL/EMPTY] origen:", new Error().stack);
        }
        return oldReject(reason);
      };
      w.__rejectPatchApplied = true;
    }

    const onRejection = (e: PromiseRejectionEvent) => {
      const r: any = e?.reason;
      // eslint-disable-next-line no-console
      console.error("[UNHANDLED REJECTION]", r, {
        type: typeof r,
        message: r?.message,
        stack: r?.stack,
      });
    };

    const onError = (e: ErrorEvent) => {
      // eslint-disable-next-line no-console
      console.error("[UNCAUGHT ERROR]", e.error || e.message);
    };

    window.addEventListener("unhandledrejection", onRejection);
    window.addEventListener("error", onError);

    return () => {
      window.removeEventListener("unhandledrejection", onRejection);
      window.removeEventListener("error", onError);
    };
  }, []);

  return null;
}
