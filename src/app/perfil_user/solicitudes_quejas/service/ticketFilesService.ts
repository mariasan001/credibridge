import { api } from "@/lib/apis";
import { TicketFileModel } from "../model/TicketFileModel";


export const getTicketFiles = async (ticketId: number): Promise<TicketFileModel[]> => {
  const response = await api.get<TicketFileModel[]>(`/api/tickets/ticket/${ticketId}`);
  return response.data;
};