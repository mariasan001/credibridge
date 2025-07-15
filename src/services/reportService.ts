import { api } from "@/lib/apis";

export interface ReportFilters {
  lenderId: number;
  contractStatusId?: number | null;
  contractType?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  userRfc: string;
}

export interface AmortizationFilters {
  reload: boolean;
  period: number;
  year: number;
}

export type GenerateReportRequest =
  | {
      reportType: "CONTRACTS";
      requestedBy: string;
      filters: ReportFilters;
    }
  | {
      reportType: "AMORTIZATION_SIMULATION";
      requestedBy: string;
      filters: AmortizationFilters;
    };

export const generateReport = async (data: GenerateReportRequest) => {
  const response = await api.post("/api/reports/generate", data);
  return response.data;
};
