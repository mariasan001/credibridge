// lib/safeAsync.ts
export function fireAndForget(p: unknown) {
  // Si es promesa, atrapamos el rechazo; si no, no pasa nada
  if (p && typeof (p as any).then === "function") {
    (p as Promise<unknown>).catch(() => {});
  }
}
