"use client";

import { useEffect, useState } from "react";
import { PayrollFile } from "../model/types/payroll";
import {
  getAllPayrollFiles,
  downloadPayrollFile,
} from "../service/payrollServiceFile";
import { FileText, Download } from "lucide-react";
import toast from "react-hot-toast";
import "./PayrollListCards.css";

type Props = {
  reloadTrigger: number;
};

export default function PayrollList({ reloadTrigger }: Props) {
  const [files, setFiles] = useState<PayrollFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const data = await getAllPayrollFiles();
        setFiles(data);
      } catch (error) {
        console.error("Error al cargar archivos:", error);
        toast.error("Ocurrió un error al cargar los archivos.");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [reloadTrigger]); // 🔁 Recarga cada vez que se sube un archivo

  const filteredFiles = files.filter((file) =>
    `${file.originalName} ${file.year} ${file.period}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleDownload = async (id: number, name: string) => {
    toast.promise(downloadPayrollFile(id, name), {
      loading: "Descargando archivo...",
      success: "Archivo descargado correctamente.",
      error: "Error al descargar el archivo.",
    });
  };

  return (
    <div className="payroll-list-container">
      <div className="payroll-header">
        <h2 className="payroll-title">Mis Archivos de Nómina</h2>
        <input
          type="text"
          placeholder="Buscar por nombre, año o periodo..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="loading-text">Cargando archivos...</p>
      ) : filteredFiles.length === 0 ? (
        <p className="empty-text">No hay archivos que coincidan con tu búsqueda.</p>
      ) : (
        <div className="card-grid">
          {filteredFiles.map((file) => (
            <div key={file.id} className="file-card">
              <div className="file-icon-wrapper">
                <FileText className="file-icon" />
              </div>
              <div className="file-details">
                <h3 className="file-name" title={file.originalName}>
                  {file.originalName}
                </h3>
                <p className="file-info">
                  Periodo {file.period}, Año {file.year}
                </p>
                <p className="file-date">
                  Subido el{" "}
                  {new Date(file.uploadDate).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <button
                className="download-icon-button"
                onClick={() => handleDownload(file.id, file.originalName)}
              >
                <Download className="download-icon" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
