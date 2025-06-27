// services/reportService.ts

import { api } from "@/lib/apis";


export const downloadReportById = async (id: string): Promise<void> => {
  try {
    const response = await api.get(`/api/reports/download/${id}`, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    const contentDisposition = response.headers["content-disposition"];
    const match = contentDisposition?.match(/filename="?([^"]+)"?/);
    const fileName = match?.[1] || `reporte-${id}.xlsx`;

    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("❌ Error al descargar el archivo:", error);
    alert("No se pudo descargar el archivo.");
  }
};
