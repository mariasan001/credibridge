
import { api } from "@/lib/apis";
import { TicketDetail } from "../model/ticket_detail_model";

export const fetchTicketDetail = async (ticketId: number): Promise<TicketDetail> => {
  const response = await api.get<TicketDetail>(`/api/tickets/${ticketId}/detail`);
  return response.data;
};
