import { api } from "@/lib/apis"
import { Ticket } from "../model/ticket.model"

interface Pageable {
  page: number
  size: number
}

interface TicketResponse {
  content: Ticket[]
  totalPages: number
  totalElements: number
}

export async function fetchTicketsByStatus1(
  statusIds: number[],
  pageable: Pageable
): Promise<TicketResponse> {
  const params = new URLSearchParams()
  statusIds.forEach(id => params.append("statusIds", id.toString()))
  params.append("page", pageable.page.toString())
  params.append("size", pageable.size.toString())

  const response = await api.get(`/api/tickets/by-status/all?${params.toString()}`)
  return response.data
}
