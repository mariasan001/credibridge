export function getEtiquetaColor(dias: number): string {
  if (dias <= 2) return "etiqueta-verde";
  if (dias <= 6) return "etiqueta-amarilla";
  return "etiqueta-roja";
}
