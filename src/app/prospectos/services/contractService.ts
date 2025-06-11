import { api } from "@/lib/apis";
import { ContractsResponse } from "../models/Contract";
import qs from "qs";
/**
 * Consulta contratos activos según múltiples estatus y paginación
 */
export const fetchContracts = (statusIds: number[], page: number) => {
  return api.get<ContractsResponse>("/api/contracts/active/all", {
    params: {
      statusIds,
      pageable: {
        page,
        size: 10,
      },
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat", allowDots: true }),
  });
};

/**
 * Actualiza el estatus de un contrato
 */
export const updateContractStatus = (contractId: number, newStatusId: number) => {
  return api.put("/api/lender/contracts/update-status", {
    contractId,
    newStatusId,
  });
};
/**
*/

