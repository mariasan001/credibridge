"use client";

import { useEffect, useState } from "react";
import { PayrollFile } from "../model/types/payroll";
import {
  getAllPayrollFiles,
  downloadPayrollFile,
} from "../service/payrollServiceFile";
import { FileText, Download } from "lucide-react";
import "./PayrollListCards.css";

export default function PayrollList() {
  const [files, setFiles] = useState<PayrollFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredFiles = files.filter((file) =>
    `${file.originalName} ${file.year} ${file.period}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
        <p className="loading-text">Cargando...</p>
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
                <p className="file-info">Periodo {file.period}, Año {file.year}</p>
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
                onClick={() => downloadPayrollFile(file.id, file.originalName)}
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
