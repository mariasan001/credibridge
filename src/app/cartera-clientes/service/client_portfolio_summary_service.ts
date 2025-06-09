import { api } from "@/lib/apis"
import { ClientPortfolioSummary } from "../model/ClientPortfolioSummary"

export async function fetchClientPortfolioSummary(): Promise<ClientPortfolioSummary> {
  const response = await api.get("/api/lender/client-portfolio/summary")
  return response.data
}