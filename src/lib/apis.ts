"use client";
import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2910";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

function normalizeError(err: unknown, cfg?: any) {
  if (axios.isAxiosError(err)) {
    const ax = err as AxiosError<any>;
    const status = ax.response?.status;
    const body = typeof ax.response?.data === "string"
      ? ax.response?.data
      : JSON.stringify(ax.response?.data ?? {});
    const msg = `API ${cfg?.method?.toUpperCase?.() || "GET"} ${cfg?.url} → ${status ?? "ERR"} — ${ax.message} — ${body?.slice(0,200)}`;
    const e = new Error(msg);
    (e as any).status = status;
    return e;
  }
  return new Error(typeof err === "string" ? err : (err as any)?.message ?? "API error desconocido");
}

export function assertNotNull<T>(v: T, msg = "Valor nulo/indefinido"): asserts v is NonNullable<T> {
  if (v == null) throw new Error(msg);
}

api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(normalizeError(error, error?.config))
);
