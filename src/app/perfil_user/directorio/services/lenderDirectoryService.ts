import { api } from "@/lib/apis";
import { LenderDirectoryResponse } from "../models/LenderDirectoryModel";

export const getLenderDirectory = async (): Promise<LenderDirectoryResponse[]> => {
  try {
    const response = await api.get("/api/lenderServices/active-grouped");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el directorio de financieras:", error);
    throw error;
  }
};
