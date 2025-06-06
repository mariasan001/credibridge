import { useState, useEffect } from "react";
import {
  TicketDetailModel,
  TicketMessage,
} from "../model/TicketDetailModel";
import { getTicketDetail } from "../service/ticketDetailService";
import { getTicketFiles } from "../service/ticketFilesService";
import { TicketBubbleModel } from "../model/TicketBubbleModel";
import { TicketFileModel } from "../model/TicketFileModel";
import { RespondTicketDTO } from "../model/RespondTicketDTO";
import { respondTicket } from "../service/toketResponService";

export function useTicketDetail(ticketId?: number) {
  const [ticket, setTicket] = useState<TicketDetailModel | null>(null);
  const [bubbles, setBubbles] = useState<TicketBubbleModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTicketDetail(id);
      const files = await getTicketFiles(id);

      // Mensajes como burbujas
      const msgBubbles: TicketBubbleModel[] = data.messages.map((msg: TicketMessage) => ({
        type: "message",
        ...msg,
      }));

      // Archivos como burbujas
const fileBubbles: TicketBubbleModel[] = files.map((file: any) => ({
  type: "file",
  senderName: "Archivo adjunto",
  filename: file.fileName, // ← lo pasamos como 'filename'
  filetype: file.fileType, // ← lo pasamos como 'filetype'
  fileId: file.id,
  uploadDate: file.uploadDate,
}));

      // Combinar y ordenar por fecha
      const merged: TicketBubbleModel[] = [...msgBubbles, ...fileBubbles].sort((a, b) =>
        new Date(a.type === "message" ? a.sendDate : a.uploadDate).getTime() -
        new Date(b.type === "message" ? b.sendDate : b.uploadDate).getTime()
      );

      setTicket(data);
      setBubbles(merged);
    } catch (err: any) {
      console.error("❌ Error al obtener el ticket:", err?.response?.data || err.message);
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
      const payload: RespondTicketDTO = {
        ticketId,
        senderId,
        message,
        isInternal,
      };

      await respondTicket(payload);
      await fetchDetail(ticketId); // refresca después de enviar
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
    bubbles,
    loading,
    error,
    respond,
    refresh: () => ticketId && fetchDetail(ticketId),
  };
}
