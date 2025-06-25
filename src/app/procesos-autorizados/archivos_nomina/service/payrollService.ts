import { api } from "@/lib/apis";
import { PayrollUploadResponse } from "../model/types/payroll";

export async function uploadPayrollFile(
  file: File,
  period: number,
  year: number
): Promise<PayrollUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/api/payroll/upload?period=${period}&year=${year}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
