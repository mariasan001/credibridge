import { api } from "@/lib/apis";
import { ContractModel } from "../model/ContractModel";

 

export const getContractsByUser = async (userId: string): Promise<ContractModel[]> => {
  const response = await api.get(`/api/contracts/user/${userId}`);
  return response.data;
};