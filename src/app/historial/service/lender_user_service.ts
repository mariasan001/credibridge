// services/lender_user_service.ts
import { api } from "@/lib/apis";

export const fetchLenderUserIds = async (): Promise<string[]> => {
  const res = await api.get("/api/tickets/lender/user-ids");
  return res.data;
};
