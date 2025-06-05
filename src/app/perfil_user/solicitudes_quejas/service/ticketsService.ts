
import { api } from "@/lib/apis";
import { TicketModel } from "../model/TicketModel";

export const getTicketsByUser = async (): Promise<TicketModel[]> => {
  const response = await api.get("/api/tickets/user");
  return response.data;
};