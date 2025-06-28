import { api } from "@/lib/apis";
import { LenderService } from "../types/lenderService";

// Obtener todos
export const getLenderServices = async (): Promise<LenderService[]> => {
  const response = await api.get("/api/admin/lender-services");
  return response.data;
};

// Crear uno nuevo
export const createLenderService = async (data: Partial<LenderService>): Promise<LenderService> => {
  const response = await api.post("/api/admin/lender-services", data);
  return response.data;
};

// Actualizar por ID
export const updateLenderService = async (id: number, data: Partial<LenderService>): Promise<LenderService> => {
  const response = await api.put(`/api/admin/lender-services/${id}`, data);
  return response.data;
};

// Eliminar por ID
export const deleteLenderService = async (id: number): Promise<void> => {
  await api.delete(`/api/admin/lender-services/${id}`);
};
