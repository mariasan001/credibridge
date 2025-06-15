import { api } from "@/lib/apis";
import qs from "qs";
import { Ticket } from "../model/ticket_model";

interface TicketResponse {
  content: Ticket[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export async function fetchTicketsByStatus(
  statusIds: number[],
  page: number = 0,
  size: number = 10
): Promise<TicketResponse> {
  const query = qs.stringify(
    {
      statusIds,
      page,
      size,
    },
    { arrayFormat: "repeat" } 
  );

  const response = await api.get(`/api/tickets/by-status/lender?${query}`);
  return response.data;
}
