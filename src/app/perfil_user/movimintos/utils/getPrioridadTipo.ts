// utils/gestPriodiadTipo.ts

export function getPrioridadTipo(tipo: string): number {
  const tipoNormalizado = tipo.toLowerCase();
  if (tipoNormalizado.includes("préstamo") || tipoNormalizado.includes("prestamo")) return 0;
  if (tipoNormalizado.includes("seguro")) return 1;
  return 2;
}