import { useState } from "react"
import { ClientPortfolioContract } from "../model/contract_model"
import { fetchClientPortfolio } from "../service/contract_service"

interface BuscarParams {
  claveSp?: string
  fechaInicio?: string
  fechaFin?: string
  page?: number
  size?: number
  sort?: string[]
}

export function useClientPortfolio() {
  const [contracts, setContracts] = useState<ClientPortfolioContract[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(1)

  const buscar = async ({
    claveSp,
    fechaInicio,
    fechaFin,
    page = 0,
    size = 10,
    sort = ["startDate,desc"],
  }: BuscarParams) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetchClientPortfolio(claveSp, fechaInicio, fechaFin, {
        page,
        size,
      })
      setContracts(response.content)
      setTotalPages(response.totalPages || 1)
    } catch (error) {
      console.error("Error al obtener cartera de clientes:", error)
      setError("Ocurrió un error al cargar la cartera.")
    } finally {
      setLoading(false)
    }
  }

  return { contracts, loading, error, totalPages, buscar }
}
