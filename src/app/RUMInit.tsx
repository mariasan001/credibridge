// app/RUMInit.tsx
"use client";

import { useEffect } from "react";

/** Convierte cualquier razón en un Error con message/stack útiles */
function ensureError(reason: unknown, fallback = "Unknown promise rejection"): Error {
  if (reason instanceof Error) return reason;
  if (typeof reason === "string") return new Error(reason);
  try {
    const asObj = (reason && typeof reason === "object") ? reason as any : {};
    const msg =
      asObj?.message ||
      (typeof asObj === "object" ? JSON.stringify(asObj) : String(asObj)) ||
      fallback;
    const err = new Error(msg);
    if (asObj?.stack) (err as any).stack = asObj.stack;
    return err;
  } catch {
    return new Error(fallback);
  }
}

export default function RUMInit() {
  useEffect(() => {
    // Evita listeners duplicados por Fast Refresh
    if (typeof window === "undefined" || (window as any).__rumInitInstalled) return;
    (window as any).__rumInitInstalled = true;

    // (Opcional) Probe para detectar quién llama Promise.reject(null)
    if (process.env.NODE_ENV !== "production") {
      const origReject = Promise.reject.bind(Promise);
      (Promise as any).reject = (reason: any) => {
        console.groupCollapsed("[Probe] Promise.reject called");
        console.log("reason:", reason);
        console.trace("stack (where reject was called)");
        console.groupEnd();
        return origReject(reason);
      };
    }

    const onError = (ev: ErrorEvent) => {
      const err = ensureError(ev.error ?? ev.message ?? "Unknown error");
      console.error("[RUM][error]", err);
      // aquí podrías trackear a tu RUM vendor
    };

    const onRejection = (ev: PromiseRejectionEvent) => {
      const err = ensureError(ev.reason);
      console.error("[RUM][unhandledrejection]", err);
      // Evita el segundo log del navegador: "Uncaught (in promise) X"
      ev.preventDefault();
      // aquí podrías trackear a tu RUM vendor
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
      (window as any).__rumInitInstalled = false;
    };
  }, []);

  return null;
}
