import { useEffect, useState } from "react";
import { TicketModel } from "../model/TicketModel";
import { getTicketsByUser } from "../service/ticketsService";

export const useTickets = () => {
  const [tickets, setTickets] = useState<TicketModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTicketsByUser()
      .then(setTickets)
      .finally(() => setLoading(false));
  }, []);

  return { tickets, loading };
};