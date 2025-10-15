// lib/safeTrack.ts
export function safeTrack(event: string, params: Record<string, any> = {}) {
  try {
    // si tu util es track(event, params)
    // @ts-ignore por si cambia firma
    return (window as any)?.track
      ? (window as any).track(event, params)
      : // o si es tu función importada:
        // track(event, params)
        null;
  } catch (e) {
    console.warn("[track skipped]", event, params, e);
    return null;
  }
}
