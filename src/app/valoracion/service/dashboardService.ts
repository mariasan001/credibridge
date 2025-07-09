// services/dashboardService.ts

import { api } from "@/lib/apis";
import { DashboardData } from "../types/DashboardData";

export async function fetchDashboardData(): Promise<DashboardData> {
  const response = await api.get<DashboardData>("/api/dashboard/admin/dashboard");
  return response.data;
}
