// promocion_service_todas.ts
import { api } from "@/lib/apis"
import { Promotion } from "../model/promotion_model_todas"

export const obtenerPromociones = async (): Promise<Promotion[]> => {
  const response = await api.get("/lender-promotions", {
    withCredentials: true, // ✅ Enviar la cookie al backend
  })

  return response.data
}
