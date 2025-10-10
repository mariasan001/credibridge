// lib/api.ts
"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { track } from "@/lib/rum"; // ← si no lo tienes, quita estas 3 líneas de RUM
// Si no usas RUM aún, elimina los track(...)

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2910";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // requiere CORS con credentials en tu backend
});

// ✅ marca tiempo en salida
api.interceptors.request.use((cfg) => {
  (cfg as any).__t0 = typeof performance !== "undefined" ? performance.now() : Date.now();
  return cfg;
});

// ✅ mide, notifica y redirige seguro en App Router
api.interceptors.response.use(
  (res) => {
    const t0 = (res.config as any).__t0 ?? Date.now();
    const dt = (typeof performance !== "undefined" ? performance.now() : Date.now()) - t0;

    // RUM opcional
    try {
      track?.({ kind: "api", url: res.config?.url, status: res.status, dt });
    } catch {}

    return res;
  },
  (error) => {
    const cfg = error?.config || {};
    const t0 = (cfg as any).__t0 ?? Date.now();
    const dt = (typeof performance !== "undefined" ? performance.now() : Date.now()) - t0;
    const status = error?.response?.status ?? 0;

    // RUM opcional
    try {
      track?.({ kind: "api", url: cfg?.url, status, dt, error: true });
    } catch {}

    if (status === 401) {
      toast.error("Tu sesión ha expirado. Inicia sesión nuevamente.", { duration: 5000, icon: "⏰" });
      // App Router (sin hooks aquí): redirección segura
      if (typeof window !== "undefined") {
        window.location.assign("/user/iniciar-sesion");
      }
    }

    // Tip útil: maneja timeout explícito
    if (error.code === "ECONNABORTED") {
      toast.error("La solicitud tardó demasiado. Intenta de nuevo.");
    }

    return Promise.reject(error);
  }
);
