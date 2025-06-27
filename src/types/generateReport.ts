// types/generateReport.ts

export type ReportFilters = {
  lenderId: number;
  userRfc: string;
  contractStatusId?: number | null;
  contractType?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};

export type GenerateReportRequest = {
  reportType: "CONTRACTS";
  requestedBy: string;
  filters: ReportFilters;
};
