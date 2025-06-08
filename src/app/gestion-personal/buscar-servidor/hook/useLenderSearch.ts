import { useState } from "react"
import { LenderSearchResponse } from "../model/lender_search_model"
import { searchLenderByUserId } from "../service/lender_search_service"


export function useLenderSearch() {
  const [data, setData] = useState<LenderSearchResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const buscar = async (userId: string) => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const result = await searchLenderByUserId(userId)
      setData(result)
    } catch (err: any) {
      setError("Error al buscar información del servidor público.")
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    error,
    buscar
  }
}
