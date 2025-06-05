import { useState, useEffect } from "react";
import { TicketDetailModel } from "../model/TicketDetailModel";
import { getTicketDetail } from "../service/ticketDetailService";

export function useTicketDetail(ticketId?: number) {
  const [ticket, setTicket] = useState<TicketDetailModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTicketDetail(id);
      setTicket(data);
    } catch (err: any) {
      console.error("❌ Error al obtener detalle del ticket:", err?.response?.data || err.message);
      setError("Error al cargar el ticket.");
    } finally {
      setLoading(false);
    }
  };

  const respond = async (
    message: string,
    senderId: string,
    isInternal: boolean = false
  ) => {
    if (!ticketId) return;

    try {
                      
      await fetchDetail(ticketId); // Refrescar después de responder
    } catch (err: any) {
      console.error("❌ Error al enviar respuesta:", err?.response?.data || err.message);
      setError("Error al enviar la respuesta.");
    }
  };

  useEffect(() => {
    if (ticketId) fetchDetail(ticketId);
  }, [ticketId]);

  return {
    ticket,
    loading,
    error,
    respond,
    refresh: () => ticketId && fetchDetail(ticketId),
  };
}
