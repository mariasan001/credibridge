import { api } from "@/lib/apis";

export const solicitarContrato = async (data: any) => {
  try {
    const response = await api.post("/api/contracts", data);
    return response.data;
  } catch (error) {
    console.error("Error al solicitar contrato:", error);
    throw error;
  }
};
