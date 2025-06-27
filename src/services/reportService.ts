import { api } from "@/lib/apis";

export interface ReportFilters {
  lenderId: number;
  contractStatusId?: number | null;
  contractType?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  userRfc: string;
}

export interface GenerateReportRequest {
  reportType: "CONTRACTS";
  requestedBy: string;
  filters: ReportFilters;
}

export const generateReport = async (data: GenerateReportRequest) => {
  const response = await api.post("/api/reports/generate", data);
  return response.data;
};



