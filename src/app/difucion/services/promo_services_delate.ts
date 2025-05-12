import { api } from "@/lib/apis"

export const eliminarPromocion = async (id: number) => {
  const response = await api.delete(`/lender-promotions/${id}`, {
    withCredentials: true, // 🔐 Envía la cookie HttpOnly al backend
  })
  return response.data
}
