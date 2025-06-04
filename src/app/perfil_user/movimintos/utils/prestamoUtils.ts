import { ContractModel } from "../model/ContractModel";

export function esPrestamo(contrato: ContractModel): boolean {
  const tipo = contrato.lenderService?.serviceType?.serviceTypeDesc?.toLowerCase() || "";

  const tieneEtiquetaPrestamo = tipo.includes("préstamo") || tipo.includes("prestamo");
  const tieneEtiquetaSeguro = tipo.includes("seguro");

  const tienePlazos = typeof contrato.installments === "number" && contrato.installments > 0;
  const tieneMonto = typeof contrato.amount === "number" && contrato.amount > 0;
  const tieneNuevoMonto =
    typeof contrato.newBalance === "number" &&
    typeof contrato.amount === "number" &&
    contrato.newBalance < contrato.amount;

  return tieneEtiquetaPrestamo || (!tieneEtiquetaSeguro && tienePlazos && tieneMonto && tieneNuevoMonto);
}

export function getMontoMostrar(contrato: ContractModel): number {
  return esPrestamo(contrato)
    ? contrato.newBalance ?? contrato.biweeklyDiscount ?? contrato.amount ?? 0
    : contrato.biweeklyDiscount ?? contrato.amount ?? 0;
}
