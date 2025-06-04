
import { api } from "@/lib/apis";
import { SolicitudContrato } from "../models/solicitudContratoModel";

export const solicitarContrato = async (payload: SolicitudContrato) => {
  const response = await api.post("/api/contracts", payload);
  return response.data;
};

