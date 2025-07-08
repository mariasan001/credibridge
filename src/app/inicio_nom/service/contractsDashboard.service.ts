import { api } from "@/lib/apis";
import { ContractsDashboardResponse } from "../model/contractsDashboard.model";


export const getContractsDashboard = async (): Promise<ContractsDashboardResponse> => {
  const response = await api.get<ContractsDashboardResponse>("/api/dashboard/admin/dashboard/contracts");
  return response.data;
};
