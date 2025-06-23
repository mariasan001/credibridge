// service/ticket_type_service.ts
import { api } from "@/lib/apis";

export interface TicketType {
  id: number;
  ticketTypeDesc: string;
}

export async function fetchTicketTypes(): Promise<TicketType[]> {
  const response = await api.get<TicketType[]>("/api/ticket-types");
  return response.data;
}
