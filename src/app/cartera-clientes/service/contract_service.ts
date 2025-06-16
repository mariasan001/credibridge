import { api } from "@/lib/apis"
import { ClientPortfolioContract } from "../model/contract_model"

interface Pageable {
  page: number
  size: number
}

interface FetchClientPortfolioResponse {
  totalElements: number
  totalPages: number
  content: ClientPortfolioContract[]
}

export async function fetchClientPortfolio(
  rfc?: string,
  fechaInicio?: string,
  fechaFin?: string,
  pageable?: Pageable,
  status?: string
): Promise<FetchClientPortfolioResponse> {
  const params: Record<string, any> = {
    ...(rfc ? { rfc } : {}),
    ...(fechaInicio ? { fechainicio: fechaInicio } : {}),
    ...(fechaFin ? { fechaFin } : {}),
    ...(status ? { status } : {}),
    page: pageable?.page,
    size: pageable?.size,
  }

  console.log("🟡 Enviando request a client-portfolio con:", params)

  const response = await api.get("/api/lender/client-portfolio", { params })
  return response.data
}
