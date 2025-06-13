import { api } from "@/lib/apis";
import { ContractUpdateRequest } from "../models/ContractUpdateRequest";

export async function updateContractConditions(data: ContractUpdateRequest): Promise<void> {
  await api.put("/api/contracts/contract/update/conditions", data);
}
