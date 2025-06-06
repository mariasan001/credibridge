// services/dashboard_service.ts

import { api } from "@/lib/apis"
import { DashboardData } from "../model/dashboard_model"


export async function getDashboardData(): Promise<DashboardData> {
  const response = await api.get<DashboardData>("/api/lender/dashboard")
  return response.data
}
