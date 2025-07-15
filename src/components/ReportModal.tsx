"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import "./ReportModal.css";
import { generateReport } from "@/services/reportService";
import { useAuth } from "@/hooks/useAuth";
import { GenerateReportRequest, ReportFilters } from "@/types/generateReport";
import { validateReportPayload } from "utils/validateReportPayload";


type ReportModalProps = {
  onClose: () => void;
  onStart: () => void;
  onFinish: () => void;
};

export const ReportModal = ({ onClose, onStart, onFinish }: ReportModalProps) => {
  const { user } = useAuth();

  const [reportType, setReportType] = useState<"CONTRACTS" | "AMORTIZATION_SIMULATION">("CONTRACTS");

  const [filters, setFilters] = useState({
    lenderId: user?.lender?.id || 2,
    userRfc: user?.rfc || "",
    contractStatusId: "",
    contractType: "",
    startDate: "",
    endDate: "",
  });

  const [simulacionFilters, setSimulacionFilters] = useState({
    reload: false,
    period: 12,
    year: new Date().getFullYear(),
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSimulacionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setSimulacionFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : Number(value),
    }));
  };

  const handleGenerate = async () => {
    const toastId = toast.loading("⏳ Generando reporte...");
    setLoading(true);
    onStart();

    try {
      let payload: GenerateReportRequest;

      if (reportType === "CONTRACTS") {
        const rawFilters = {
          lenderId: Number(filters.lenderId),
          userRfc: filters.userRfc,
          contractStatusId: filters.contractStatusId ? Number(filters.contractStatusId) : undefined,
          contractType: filters.contractType || undefined,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
        };

        const cleanFilters = Object.fromEntries(
          Object.entries(rawFilters).filter(([_, v]) => v !== undefined)
        );

        payload = {
          reportType,
          requestedBy: user?.userId || "desconocido",
          filters: cleanFilters as ReportFilters,
        };
      } else {
        payload = {
          reportType,
          requestedBy: user?.userId || "desconocido",
          filters: simulacionFilters,
        };
      }

      const errorMsg = validateReportPayload(payload);
      if (errorMsg) {
        toast.error(`❌ ${errorMsg}`, { id: toastId });
        setLoading(false);
        onFinish();
        return;
      }

      console.log("Payload enviado a generateReport:", payload);

      await generateReport(payload);

      toast.success("✅ Reporte generado correctamente", { id: toastId });
      onClose();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error al generar el reporte";
      toast.error(`❌ ${errorMessage}`, { id: toastId });
    } finally {
      setLoading(false);
      onFinish();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Generador de Reportes</h2>
        <form className="modal-form" onSubmit={(e) => {
          e.preventDefault();
          handleGenerate();
        }}>
          <p>Solicitado por: <strong>{user?.name}</strong></p>

          {/* Tipo de Reporte */}
          <div className="form-group">
            <label htmlFor="reportType">Tipo de Reporte</label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="form-input"
              disabled={loading}
            >
              <option value="CONTRACTS">Contratos</option>
              <option value="AMORTIZATION_SIMULATION">Simulación de Amortización</option>
            </select>
          </div>

          {/* Filtros dinámicos */}
          {reportType === "CONTRACTS" ? (
            <>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="lenderId">ID Financiera</label>
                  <input
                    id="lenderId"
                    name="lenderId"
                    value={filters.lenderId}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="userRfc">RFC del Servidor</label>
                  <input
                    id="userRfc"
                    name="userRfc"
                    value={filters.userRfc}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contractType">Tipo de Contrato</label>
                  <select
                    id="contractType"
                    name="contractType"
                    value={filters.contractType}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                  >
                    <option value="">Todos</option>
                    <option value="PRESTAMO">Préstamo</option>
                    <option value="RENTA">Seguros</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contractStatusId">Estatus de Contrato</label>
                  <select
                    id="contractStatusId"
                    name="contractStatusId"
                    value={filters.contractStatusId}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                  >
                    <option value="">Todos</option>
                    <option value="1">Activo</option>
                    <option value="2">Liquidado</option>
                    <option value="3">Cancelado</option>
                  </select>
                </div>
              </div>

              <div className="date-range">
                <div className="form-group">
                  <label htmlFor="startDate">Fecha Inicio</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endDate">Fecha Fin</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleChange}
                    className="form-input"
                    disabled={loading}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="reload">
                  <input
                    type="checkbox"
                    id="reload"
                    name="reload"
                    checked={simulacionFilters.reload}
                    onChange={handleSimulacionChange}
                    disabled={loading}
                  />
                  &nbsp;Recargar
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="period">Periodo (meses)</label>
                <input
                  type="number"
                  id="period"
                  name="period"
                  value={simulacionFilters.period}
                  onChange={handleSimulacionChange}
                  className="form-input"
                  disabled={loading}
                  min={1}
                />
              </div>

              <div className="form-group">
                <label htmlFor="year">Año</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={simulacionFilters.year}
                  onChange={handleSimulacionChange}
                  className="form-input"
                  disabled={loading}
                  min={2000}
                />
              </div>
            </>
          )}

          <div className="modal-actions">
            <button type="button" onClick={onClose} disabled={loading}>Cancelar</button>
            <button type="submit" disabled={loading}>
              {loading ? "Generando..." : "Generar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
