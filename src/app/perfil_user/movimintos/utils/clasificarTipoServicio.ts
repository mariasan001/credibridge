import { ContractModel } from "../model/ContractModel";

export function esPrestamoOculto(contrato: ContractModel): boolean {
  const tipo = contrato.lenderService?.serviceType?.serviceTypeDesc?.toLowerCase() || "";

  const tieneEtiquetaPrestamo = tipo.includes("préstamo") || tipo.includes("prestamo");
  const tieneEtiquetaSeguro = tipo.includes("seguro");

  const tienePlazos = typeof contrato.installments === "number" && contrato.installments > 0;
  const tieneMonto = typeof contrato.amount === "number" && contrato.amount > 0;
  const tieneNuevoMonto =
    typeof contrato.newBalance === "number" &&
    typeof contrato.amount === "number" &&
    contrato.newBalance < contrato.amount;

  return !tieneEtiquetaPrestamo && !tieneEtiquetaSeguro && tienePlazos && tieneMonto && tieneNuevoMonto;
}

export function clasificarTipoServicio(contrato: ContractModel): "Préstamo" | "Seguro" | "Servicio" {
  const raw = contrato.lenderService?.serviceType?.serviceTypeDesc?.toLowerCase() || "";

  if (raw.includes("préstamo") || raw.includes("prestamo")) return "Préstamo";
  if (raw.includes("seguro")) return "Seguro";

  return esPrestamoOculto(contrato) ? "Préstamo" : "Servicio";
}

export function obtenerClaseColor(tipo: string): "naranja" | "verde" | "gris" {
  const normal = tipo.toLowerCase();
  if (normal.includes("préstamo") || normal.includes("prestamo")) return "naranja";
  if (normal.includes("seguro")) return "verde";
  return "gris";
}


function obtenerPrioridad(tipo: string) {
  const tipoNormalizado = tipo.toLowerCase();
  if (tipoNormalizado.includes("préstamo") || tipoNormalizado.includes("prestamo")) return 0;
  if (tipoNormalizado.includes("seguro")) return 1;
  return 2;
}

