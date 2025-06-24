// app/dashboard/service/dashboard_service.ts

import { DashboardContract } from "../model/dashboard.model";
import { api } from "@/lib/apis";

export interface DashboardFilterPayload {
  startDateFrom: string;
  startDateTo: string;
  contractStatusIds: number[];
  lenderId: number;
}

export interface DashboardContractResponse {
  content: DashboardContract[];
  totalPages: number;
  totalElements: number;
  number: number; // página actual
}

export async function fetchDashboardContracts(
  filters: DashboardFilterPayload,
  page: number = 0,
  size: number = 30,
  sort: string = "startDate,desc"
): Promise<DashboardContractResponse> {
  const response = await api.post(
    `/api/dashboard/admin/filter?page=${page}&size=${size}&sort=${sort}`,
    filters
  );
  return response.data;
}
