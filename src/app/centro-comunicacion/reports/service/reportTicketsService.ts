// reports/service/reportTicketsService.ts

import { api } from "@/lib/apis";
import { ReportTicket } from "../model/reportTicket.model";

/**
 * Función que obtiene los tickets de reporte para un usuario específico
 * @param userId - ID del usuario (servidor público)
 * @returns Lista de ReportTicket
 */
export const fetchReportTickets = async (userId: string): Promise<ReportTicket[]> => {
  const res = await api.get("/api/dashboard/admin/report", {
    params: { userId }
  });
  return res.data;
};
