// lib/services/uploadService.ts
import { api } from "@/lib/apis";

export async function uploadPayrollFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/batch/upload-payroll", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function uploadCatalogFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/batch/upload-catalog", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
