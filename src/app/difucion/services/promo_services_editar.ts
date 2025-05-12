import { api } from "@/lib/apis"
import { PromotionCreatePayload } from "../model/promocion_model"

// 🔁 PUT para editar promoción por ID
export const actualizarPromocion = async (id: number, data: PromotionCreatePayload) => {
  const response = await api.put(`/lender-promotions/${id}`, data, {
    withCredentials: true, // ✅ importante para cookies
  })
  return response.data
}
