export type ReportFilters = {
  lenderId: number;
  userRfc: string;
  contractStatusId?: number | null;
  contractType?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};

export type AmortizationFilters = {
  reload: boolean;
  period: number;
  year: number;
};

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
