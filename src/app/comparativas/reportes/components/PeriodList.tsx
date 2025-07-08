"use client";

import { useEffect, useState } from "react";
import "./ReportsTable.css";
import { Download } from "lucide-react";
import toast from "react-hot-toast";
import { Report } from "../models/types/report";
import { getReports } from "../services/periodService1";
import { downloadReportById } from "../services/reportService";
import { Pagination } from "@/app/cartera-clientes/components/Pagination";

const capitalizar = (texto: string) =>
  texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

const formatFecha = (fecha: string) => {
  const opciones: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return new Date(fecha).toLocaleDateString("es-MX", opciones);
};

const beautifyStatus = (status: string) =>
  status.replace(/_/g, " ").toLowerCase().replace(/^[a-z]/, (c) => c.toUpperCase());

const getStatusClass = (status: string) => {
  const normalized = status.toLowerCase();
  let base = "status-tag ";
  switch (normalized) {
    case "finished":
      return base + "status-finalizado";
    case "in_progress":
      return base + "status-en-proceso";
    case "failed":
      return base + "status-pendiente";
    default:
      return base;
  }
};

const getBarColor = (value: number) => {
  if (value < 30) return "#f44336";
  if (value < 60) return "#ff9800";
  if (value < 90) return "#cddc39";
  return "#4caf50";
};

export const ReportsTable = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroEstatus, setFiltroEstatus] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getReports();
        setReports(data);
      } catch (err) {
        toast.error("Error al obtener reportes");
        setError("Error al obtener reportes");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtrados = reports.filter((r) => {
    const tipo = r.reportType.toLowerCase().includes(filtroTipo.toLowerCase());
    const estatus = beautifyStatus(r.status).toLowerCase().includes(filtroEstatus.toLowerCase());
    const fecha = formatFecha(r.createdAt).toLowerCase().includes(filtroFecha.toLowerCase());
    return tipo && estatus && fecha;
  });

  const totalPages = Math.ceil(filtrados.length / itemsPerPage);
  const paginatedReports = filtrados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p className="loading">Cargando reportes...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="reports-table-container">
      <div className="filtros-reportes">
        <input
          type="text"
          placeholder="Filtrar por tipo"
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por estatus"
          value={filtroEstatus}
          onChange={(e) => setFiltroEstatus(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por fecha"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
        />
      </div>

      <table className="tabla-reportes">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Estatus</th>
            <th>Progreso</th>
            <th>Generado</th>
            <th>Finalizado</th>
            <th>Descargar</th>
          </tr>
        </thead>
        <tbody>
          {paginatedReports.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                No hay reportes que coincidan.
              </td>
            </tr>
          ) : (
            paginatedReports.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{capitalizar(r.reportType)}</td>
                <td>
                  <span className={getStatusClass(r.status)}>{beautifyStatus(r.status)}</span>
                </td>
                <td>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${r.progress}%`,
                        backgroundColor: getBarColor(r.progress),
                      }}
                    ></div>
                  </div>
                </td>
                <td>{formatFecha(r.createdAt)}</td>
                <td>{formatFecha(r.finishedAt)}</td>
                <td className="descargar-icono">
                  <button
                    className="icon-view"
                    onClick={() =>
                      downloadReportById(r.id)
                        .then(() => toast.success("Reporte descargado"))
                        .catch(() => toast.error("No se pudo descargar el archivo"))
                    }
                    title="Descargar reporte"
                  >
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};
