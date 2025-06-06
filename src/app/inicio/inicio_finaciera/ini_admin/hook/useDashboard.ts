// hooks/useDashboard.ts
import { useEffect, useState } from "react"
import { DashboardData } from "../model/dashboard_model"
import { getDashboardData } from "../service/dashboard_service"


export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getDashboardData()
      .then(setData)
      .catch(() => setError("Error al cargar el dashboard"))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
