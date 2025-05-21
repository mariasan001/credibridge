import { api } from "@/lib/apis";
import { PromotionCreate } from "../model/PromotionCreate";

export const createPromotion = async (data: PromotionCreate) => {
  try {
    const response = await api.post("/lender-promotions", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear promoción:", error);
    throw error;
  }
};
