import { api } from "@/lib/apis";

export const fetchAssignableUsers = () => {
  return api.get<string[]>("/api/tickets/lender/user-ids");
};

export const assignContract = (contractId: number, userId: string) => {
  return api.post("/api/lender/assign", {
    contractId,
    userId,
  });
};
