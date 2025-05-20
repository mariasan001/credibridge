import { api } from "@/lib/apis";
import { Promotion } from "../model/Promotion";

export const getActivePromotions = async (): Promise<Promotion[]> => {
  try {
    const response = await api.get("/lender-promotions/active");
    return response.data;
  } catch (error) {
    console.error("Error al obtener promociones activas:", error);
    throw error;
  }
};
