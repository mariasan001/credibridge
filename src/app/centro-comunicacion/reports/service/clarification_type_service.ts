import { api } from "@/lib/apis";
import { ClarificationType } from "../model/ClarificationType";

export async function fetchClarificationTypes(): Promise<ClarificationType[]> {
  const response = await api.get("/api/clarification-types");
  return response.data;
}
