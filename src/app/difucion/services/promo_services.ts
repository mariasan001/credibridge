// promo_services.ts
import { api } from "@/lib/apis";
import { PromotionCreatePayload } from "../model/promocion_model";

export const crearPromocion = async (data: PromotionCreatePayload, token: string) => {
  const response = await api.post("/lender-promotions", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
