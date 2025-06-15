// service/closeTicketService.ts
import { api } from "@/lib/apis";

export async function closeTicket(ticketId: number): Promise<void> {
  await api.post(`/api/tickets/${ticketId}/close`);
}
