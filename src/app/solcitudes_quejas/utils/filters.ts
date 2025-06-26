export function filtrarPorTiempo(fechaStr: string, filtro: string): boolean {
  if (filtro === "TODO") return true;
  const fecha = new Date(fechaStr);
  const ahora = new Date();
  const dias = (ahora.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24);
  if (filtro === "MES") return dias <= 30;
  if (filtro === "3MESES") return dias <= 90;
  if (filtro === "AÑO") return dias <= 365;
  return true;
}
