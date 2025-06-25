"use client";

import { useEffect, useState } from "react";
import { PayrollFile } from "../model/types/payroll";
import {
  getAllPayrollFiles,

} from "../service/payrollServiceFile";
import { downloadPayrollFile } from "../service/payrollServiceFile";

export default function PayrollList() {
  const [files, setFiles] = useState<PayrollFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await getAllPayrollFiles();
        setFiles(data);
      } catch (error) {
        console.error("Error al cargar archivos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Archivos Subidos</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : files.length === 0 ? (
        <p>No hay archivos cargados.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nombre original</th>
              <th className="p-2 border">Periodo</th>
              <th className="p-2 border">Año</th>
              <th className="p-2 border">Fecha de subida</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td className="p-2 border">{file.id}</td>
                <td className="p-2 border">{file.originalName}</td>
                <td className="p-2 border">{file.period}</td>
                <td className="p-2 border">{file.year}</td>
                <td className="p-2 border">
                  {new Date(file.uploadDate).toLocaleString()}
                </td>
                <td className="p-2 border text-center">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      downloadPayrollFile(file.id, file.originalName)
                    }
                  >
                    Descargar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
