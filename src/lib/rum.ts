// src/lib/rum.ts
"use client";

/**
 * RUM minimalista pero robusto:
 * - Buffer con envío por lotes
 * - sendBeacon (fallback a fetch POST)
 * - Flush en intervalos, pagehide y visibilitychange
 * - Guarda última tanda en localStorage si no hay endpoint
 * - Configurable por NEXT_PUBLIC_RUM_URL o /rum (App Router)
 */

export type Metric = Record<string, any>;

const APP_NAME = "credibridge-web";
const VERSION = 1;
const MAX_BATCH = 20;
const FLUSH_MS = 5000;

let BUF: Metric[] = [];
let flushTimer: number | null = null;

// Endpoint de envío (si no se define, usa /rum en el mismo host)
let RUM_URL: string =
  (typeof process !== "undefined" &&
    (process as any).env?.NEXT_PUBLIC_RUM_URL) ||
  "/rum";

/** Permite cambiar el endpoint en runtime si lo necesitas */
export function setRumEndpoint(url: string) {
  RUM_URL = (url || "").trim() || "/rum";
}

/** Pushea una métrica al buffer (se agrega timestamp) */
export function track(metric: Metric) {
  if (typeof window === "undefined") return; // sólo cliente
  BUF.push({ ts: Date.now(), ...metric });

  // si crece el buffer, flush inmediato
  if (BUF.length >= MAX_BATCH) {
    flush();
    return;
  }
  // si no hay timer, programa uno
  if (!flushTimer) {
    flushTimer = window.setTimeout(() => {
      flush();
      flushTimer = null;
    }, FLUSH_MS);
  }
}

/** Intenta enviar por sendBeacon; si no, usa fetch POST */
async function sendPayload(url: string, payload: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const ok = navigator.sendBeacon(url, payload);
      if (ok) return true;
      // algunos navegadores devuelven false si no pudo encolar el beacon
    }
  } catch {
    /* ignore */
  }
  // Fallback: fetch POST (no bloquear la UI)
  try {
    const res = await fetch(url, {
      method: "POST",
      body: payload,
      headers: { "Content-Type": "application/json" },
      keepalive: true, // ayuda en pagehide
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function flush() {
  if (typeof window === "undefined") return;
  if (!BUF.length) return;

  const data = BUF.splice(0);
  const payload = JSON.stringify({ app: APP_NAME, v: VERSION, data });

  // 👇 Clave: en desarrollo, siempre duplicamos en localStorage
  const isDev = process.env.NODE_ENV !== "production";
  if (isDev) {
    try { localStorage.setItem("RUM_LAST", payload); } catch {}
  }

  if (!RUM_URL) return; // sin endpoint, ya lo dejamos en localStorage

  void (async () => {
    const ok = await sendPayload(RUM_URL, payload);
    if (!ok && !isDev) {
      // si falló en prod, al menos guarda el último batch
      try { localStorage.setItem("RUM_LAST", payload); } catch {}
    }
  })();
}


/** Inicializa manejadores globales para no perder eventos */
export function initRum() {
  if (typeof window === "undefined") return;

  // Flush cuando la página se oculta o se va
  const onHide = () => flush();
  const onVis = () => {
    if (document.visibilityState === "hidden") flush();
  };

  window.addEventListener("pagehide", onHide);
  document.addEventListener("visibilitychange", onVis);

  // Limpieza por si este módulo se re-monta en HMR
  return () => {
    window.removeEventListener("pagehide", onHide);
    document.removeEventListener("visibilitychange", onVis);
  };
}

/** Opcional: empuja un contexto básico del cliente una sola vez */
let pushedContext = false;
export function pushClientContextOnce() {
  if (pushedContext || typeof window === "undefined") return;
  pushedContext = true;
  const nav: any = navigator;
  try {
    track({
      kind: "context",
      app: APP_NAME,
      ua: navigator.userAgent,
      lang: navigator.language,
      w: window.innerWidth,
      h: window.innerHeight,
      conn: nav?.connection?.effectiveType,
      mem: (performance as any)?.memory?.jsHeapSizeLimit,
    });
  } catch {
    /* ignore */
  }
}

// Auto-init listeners al importar (seguro en client)
initRum();
