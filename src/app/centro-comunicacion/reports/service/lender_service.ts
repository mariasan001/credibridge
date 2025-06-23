import { api } from "@/lib/apis";

export async function fetchLenders(): Promise<Lender[]> {
  const response = await api.get<Lender[]>("/api/lenders");
  return response.data;
}
