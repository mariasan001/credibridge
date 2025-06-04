import { useMemo } from "react";
import { ContractModel } from "../model/ContractModel";
import { clasificarTipoServicio, obtenerClaseColor } from "../utils/clasificarTipoServicio";

export function useDetectarTipoServicio(contrato: ContractModel) {
  return useMemo(() => {
    const tipo = clasificarTipoServicio(contrato);
    const colorClase = obtenerClaseColor(tipo);
    return { tipo, colorClase };
  }, [contrato]);
}
