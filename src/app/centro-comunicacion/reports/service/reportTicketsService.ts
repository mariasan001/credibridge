// reports/service/reportTicketsService.ts

import { api } from "@/lib/apis"
import { ReportTicket } from "../model/reportTicket.model"

export const fetchReportTickets = async (userId: string): Promise<ReportTicket[]> => {
  const res = await api.get("/api/dashboard/admin/report", {
    params: { userId }
  })
  return res.data
}
