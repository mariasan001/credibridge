import { api } from "@/lib/apis"
import { TicketDetail } from "../model/ticket_detail_model"

export async function fetchTicketDetail(id: number): Promise<TicketDetail> {
  const response = await api.get(`/api/tickets/${id}/detail`)
  return response.data
}
