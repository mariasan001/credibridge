import { api } from "@/lib/apis"
import { Ticket } from "../model/ticket_model"

export async function fetchTickets(): Promise<Ticket[]> {
  const response = await api.get("/api/tickets/unassigned") 
  return response.data
}
