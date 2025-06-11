import { api } from "@/lib/apis";
import { ContractStatus } from "../models/ContractStatus";

/**
 * Consulta todos los estatus posibles de contrato
 */
export const fetchAllStatuses = () => {
  return api.get<ContractStatus[]>("/api/contract-status");
};
