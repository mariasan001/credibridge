import { GenerateReportRequest, ReportFilters } from "@/types/generateReport";
import { AmortizationFilters } from "@/services/reportService";

export const validateReportPayload = (data: GenerateReportRequest): string | null => {
  const { reportType, filters } = data;

  if (reportType === "CONTRACTS") {
    const f = filters as ReportFilters;

    if (!f.lenderId || isNaN(Number(f.lenderId))) return "ID Financiera inválido";
    if (!f.userRfc || f.userRfc.trim() === "") return "RFC requerido";
    if (f.startDate && f.endDate && f.startDate > f.endDate) {
      return "La fecha de inicio no puede ser mayor que la fecha de fin";
    }

  } else if (reportType === "AMORTIZATION_SIMULATION") {
    const f = filters as AmortizationFilters;

    if (typeof f.reload !== "boolean") return "El campo reload debe ser booleano";
    if (!f.period || f.period <= 0) return "El periodo debe ser mayor a 0";
    if (!f.year || f.year < 2000 || f.year > 2100) return "Año inválido";
  }

  return null;
};
