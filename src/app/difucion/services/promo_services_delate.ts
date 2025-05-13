import { api } from "@/lib/apis"

export const eliminarPromocion = async (id: number) => {
  const response = await api.delete(`/lender-promotions/${id}`, {
    withCredentials: true, // ✅ Necesario para cookies seguras
  })
  return response.data
}
