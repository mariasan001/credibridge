// src/app/perfil_user/solicitudes_quejas/service/assign_ticket_service.ts
import { api } from "@/lib/apis";
import { AssignTicketDTO } from "../model/AssignTicketDTO";

export const assignTicket = async (payload: AssignTicketDTO): Promise<string> => {
  const response = await api.post("/api/tickets/assign", payload);
  return response.data;
};
