import { api } from "@/lib/apis";
import { RankingDashboardData } from "../model/ranking-dashboard.model";

export async function fetchRankingDashboard(): Promise<RankingDashboardData> {
  const response = await api.get("/api/dashboard/admin/ranking");
  return response.data;
}
