
import { api } from "@/lib/apis";
import { RespondTicketDTO } from "../model/RespondTicketDTO";

export const respondTicket = async (payload: RespondTicketDTO): Promise<string> => {
  const response = await api.post("/api/tickets/respond", payload);
  return response.data;
};