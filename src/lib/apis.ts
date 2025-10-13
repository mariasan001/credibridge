"use client";

import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { track } from "@/lib/rum"; // opcional

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2910";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Utilidad: siempre devuelve un Error con mensaje útil
function normalizeError(err: unknown, cfg?: any, extra?: Partial<{ dt: number; status: number }>) {
  // AxiosError → mensaje legible
  if (axios.isAxiosError(err)) {
    const ax = err as AxiosError<any>;
    const status = ax.response?.status;
    const body   = typeof ax.response?.data === "string"
      ? ax.response?.data
      : JSON.stringify(ax.response?.data ?? {});
    const msg = `API ${cfg?.method?.toUpperCase?.() || "GET"} ${cfg?.url} → ${status ?? "ERR"} — ${ax.message} — ${body?.slice(0, 200)}`;
    const e = new Error(msg);
    (e as any).status = status;
    (e as any).url = cfg?.url;
    (e as any).dt = extra?.dt;
    return e;
  }

  // Valores “falsos” o raros → Error con mensaje explícito
  if (err == null) {
    const e = new Error(`API error (valor nulo/indefinido) en ${cfg?.url ?? "desconocido"}`);
    (e as any).url = cfg?.url;
    (e as any).dt = extra?.dt;
    return e;
  }

  // Cualquier otra cosa
  const e = new Error(typeof err === "string" ? err : (err as any)?.message ?? "API error desconocido");
  Object.assign(e as any, { url: cfg?.url, dt: extra?.dt, raw: err });
  return e;
}

// ⏱ marca tiempo salida
api.interceptors.request.use((cfg) => {
  (cfg as any).__t0 = typeof performance !== "undefined" ? performance.now() : Date.now();
  return cfg;
});

api.interceptors.response.use(
  (res) => {
    const t0 = (res.config as any).__t0 ?? Date.now();
    const dt = (typeof performance !== "undefined" ? performance.now() : Date.now()) - t0;

    try { track?.({ kind: "api", url: res.config?.url, status: res.status, dt }); } catch {}
    return res;
  },
  (error) => {
    const cfg = error?.config || {};
    const t0 = (cfg as any).__t0 ?? Date.now();
    const now = (typeof performance !== "undefined" ? performance.now() : Date.now());
    const dt = now - t0;
    const status = error?.response?.status ?? 0;

    try { track?.({ kind: "api", url: cfg?.url, status, dt, error: true }); } catch {}

    // Evitar toasts durante SSR (por si algún import cruzado)
    const canToast = typeof window !== "undefined";

    if (status === 401 && canToast) {
      toast.error("Tu sesión ha expirado. Inicia sesión nuevamente.", { duration: 5000, icon: "⏰" });
      window.location.assign("/user/iniciar-sesion");
    }

    if (error?.code === "ECONNABORTED" && canToast) {
      toast.error("La solicitud tardó demasiado. Intenta de nuevo.");
    }

    // 🔒 Rechaza SIEMPRE con Error real y con contexto
    return Promise.reject(normalizeError(error, cfg, { dt, status }));
  }
);
