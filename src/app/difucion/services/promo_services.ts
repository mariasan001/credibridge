// promo_services.ts
import { api } from "@/lib/apis"
import { PromotionCreatePayload } from "../model/promocion_model"

export const crearPromocion = async (data: PromotionCreatePayload) => {
  const response = await api.post("/lender-promotions", data, {
    withCredentials: true, // ✅ Enviar la cookie HttpOnly al backend
  })

  return response.data
}
