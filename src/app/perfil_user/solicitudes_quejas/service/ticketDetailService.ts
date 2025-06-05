
import { api } from "@/lib/apis";
import { TicketDetailModel } from "../model/TicketDetailModel";

export async function getTicketDetail(id: number): Promise<TicketDetailModel> {
  const response = await api.get(`/api/tickets/${id}/detail`);
  return response.data;
}
