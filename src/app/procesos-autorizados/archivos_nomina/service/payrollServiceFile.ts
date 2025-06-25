import { api } from "@/lib/apis";
import { PayrollFile } from "../model/types/payroll";

// Obtener todos los archivos de nómina
export async function getAllPayrollFiles(): Promise<PayrollFile[]> {
  const response = await api.get<PayrollFile[]>("/api/payroll/all");
  return response.data;
}

// Descargar archivo de nómina por ID
export async function downloadPayrollFile(id: number, originalName: string) {
  try {
    const response = await api.get(`/api/payroll/nomina/download/${id}`, {
      responseType: "blob",
    });

    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;

    // Limpia el nombre del archivo para evitar errores
    const safeName = originalName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    a.download = safeName;

    // Simula el clic para iniciar descarga
    a.click();

    // Limpieza del objeto URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al descargar archivo:", error);
    alert("Hubo un error al intentar descargar el archivo.");
  }
}
