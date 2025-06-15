import { api } from "@/lib/apis";
import { ContractsResponse } from "../models/Contract";
import qs from "qs";

/**
 * Consulta contratos activos según múltiples estatus y paginación.
 *
 * @param statusIds - Array de IDs de estatus que se deben incluir en la búsqueda.
 * @param page - Número de página (inicia en 0 o 1 según tu backend).
 * @param size - Cantidad de contratos por página (default = 10).
 * @returns Promise con la respuesta tipada de contratos.
 */
export const fetchContracts = (
  statusIds: number[],
  page: number,
  size: number = 10
) => {
  return api.get<ContractsResponse>("/api/contracts/active/all", {
    params: {
      statusIds, // Lista de estatus a buscar
      pageable: {
        page,     // Página actual
        size,     // Tamaño de página (default: 10)
      },
    },
    // Serializa los parámetros para que statusIds se repita como `statusIds=1&statusIds=2`
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat", allowDots: true }),
  });
};

/**
 * Actualiza el estatus de un contrato específico.
 *
 * @param contractId - ID del contrato a actualizar.
 * @param newStatusId - Nuevo ID de estatus que se asignará.
 * @returns Promise con la respuesta del servidor.
 */
export const updateContractStatus = (
  contractId: number,
  newStatusId: number
) => {
  return api.put("/api/lender/contracts/update-status", {
    contractId,
    newStatusId,
  });
};
