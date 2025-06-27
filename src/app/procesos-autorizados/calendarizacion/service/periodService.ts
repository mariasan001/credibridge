import { api } from "@/lib/apis"; // Asegúrate de que sea "apis" o "api" según tu proyecto
import { Period } from "../models/types/period";

// Crear nuevo periodo
export const createPeriod = async (data: Period) => {
  const response = await api.post("/api/periods", data);
  return response.data;
};

// Obtener todos los periodos
export const getPeriods = async (): Promise<Period[]> => {
  const response = await api.get("/api/periods");
  return response.data;
};
