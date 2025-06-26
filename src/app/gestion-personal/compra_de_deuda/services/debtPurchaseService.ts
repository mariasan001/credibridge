import { api } from "@/lib/apis";
import { DebtPurchase } from "../model/DebtPurchase";

/**
 * Obtiene la lista de solicitudes de compra de deuda
 */
export const obtenerSolicitudesDeuda = async (): Promise<DebtPurchase[]> => {
  const response = await api.get("/api/debt-purchase");
  return response.data;
};

/**
 * Actualiza el estatus de una solicitud de compra de deuda
 * @param requestId ID de la solicitud a actualizar
 * @param newStatus Nuevo estatus que se desea asignar
 */
export const actualizarEstatusSolicitud = async (
  requestId: number,
  newStatus: string
): Promise<string> => {
  const response =await api.patch("/api/debt-purchase/estatus", {
  requestId,
  newStatus,
});

  return response.data; 
};
