import { api } from "@/lib/apis";
// periodService1.ts
import { Report } from "../models/types/report";
export const getReports = async (): Promise<Report[]> => {
  const response = await api.get("/api/reports/list");
  return response.data;
};
