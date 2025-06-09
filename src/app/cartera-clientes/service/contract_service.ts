import { api } from "@/lib/apis"
import { ClientPortfolioContract } from "../model/contract_model"

interface Pageable {
  page: number
  size: number
  // sort eliminado porque no es necesario ni soportado correctamente
}

interface FetchClientPortfolioResponse {
  totalElements: number
  totalPages: number
  content: ClientPortfolioContract[]
}

export async function fetchClientPortfolio(
  claveSp?: string,
  fechaInicio?: string,
  fechaFin?: string,
  pageable?: Pageable
): Promise<FetchClientPortfolioResponse> {
  const params: Record<string, any> = {

    ...(claveSp ? { claveSp } : {}),
    ...(fechaInicio ? { fechainicio: fechaInicio } : {}),
    ...(fechaFin ? { fechaFin } : {}),
    page: pageable?.page,
    size: pageable?.size,
  }

  console.log("🟡 Enviando request a client-portfolio con:", params)

  const response = await api.get("/api/lender/client-portfolio", { params })
  return response.data
}
