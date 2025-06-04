import { ContractModel } from "../model/ContractModel";
import { esPrestamo } from "../utils/prestamoUtils";

export function useTipoServicio(contrato: ContractModel) {
  const tipoRaw = contrato.lenderService?.serviceType?.serviceTypeDesc || "Servicio";
  const tipoServicioFinal = esPrestamo(contrato)
    ? "Préstamo"
    : tipoRaw.charAt(0).toUpperCase() + tipoRaw.slice(1).toLowerCase();

  const tipoServicioNormalizado = tipoServicioFinal.toLowerCase();

  const colorClase = tipoServicioNormalizado.includes("préstamo")
    ? "naranja"
    : tipoServicioNormalizado.includes("seguro")
    ? "verde"
    : "gris";

  return { tipoServicioFinal, colorClase, esPrestamo: tipoServicioNormalizado.includes("préstamo") };
}
