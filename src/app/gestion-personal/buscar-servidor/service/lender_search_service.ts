import { api } from "@/lib/apis"
import { LenderSearchResponse } from "../model/lender_search_model"

/**
 * Busca información de un usuario y sus contratos financieros
 * @param userId Número de servidor público
 * @returns Datos del usuario, límite de descuento y contratos
 *
 */
export async function searchLenderByUserId(userId: string): Promise<LenderSearchResponse> {
  const response = await api.get<LenderSearchResponse>(`/api/lender/search`, {
    params: { value: userId }
  })
  return response.data
}
