
import { api } from "@/lib/apis";
import axios from "axios";
import { TicketBroadcastPayload } from "../model/TicketBroadcastPayload";

export async function sendBroadcastTicket(payload: TicketBroadcastPayload) {
  const formData = new FormData();
  formData.append("data", JSON.stringify(payload.data));

  if (payload.file) {
    formData.append("file", payload.file);
  }

  try {
    const response = await api.post("/api/tickets/broadcast", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      console.error("❌ Error del backend:", error.response.data);
      throw new Error(error.response.data.message || "Error en el servidor");
    }
    throw error;
  }
}
