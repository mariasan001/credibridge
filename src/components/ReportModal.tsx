"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth"; // ✅ Zustand
import { generateReport } from "@/services/reportService";
import toast from "react-hot-toast";
import "./ReportModal.css";
import { GenerateReportRequest, ReportFilters } from "@/types/generateReport";

type ReportModalProps = {
  onClose: () => void;
  onStart: () => void;
  onFinish: () => void;
};

// 🔧 Constantes para selects
const contractTypes = [
  { label: "Todos", value: "" },
  { label: "Préstamo", value: "PRESTAMO" },
  { label: "Seguros", value: "RENTA" },
];

const contractStatuses = [
  { label: "Todos", value: "" },
  { label: "Activo", value: "1" },
  { label: "Liquidado", value: "2" },
  { label: "Cancelado", value: "3" },
];

export const ReportModal = ({ onClose, onStart, onFinish }: ReportModalProps) => {
  const { user } = useAuth();

  const [filters, setFilters] = useState({
    lenderId: user?.lender?.id || 2,
    userRfc: user?.rfc || "",
    contractStatusId: "",
    contractType: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleGenerate = async () => {
    // 🔒 Validación de usuario
    if (!user) {
      toast.error("⚠️ No se encontró el usuario actual.");
      return;
    }

    // 🔍 Validación de RFC
    if (filters.userRfc && !/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/.test(filters.userRfc)) {
      toast.error("⚠️ El RFC no es válido");
      return;
    }

    // 🗓️ Validación de fechas
    if (filters.startDate && filters.endDate && filters.startDate > filters.endDate) {
      toast.error("La fecha de inicio no puede ser mayor que la fecha de fin");
      return;
    }

    const toastId = toast.loading("⏳ Generando reporte...");
    setLoading(true);
    onStart();

    try {
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

      const payload: GenerateReportRequest = {
        reportType: "CONTRACTS",
        requestedBy: user.userId,
        filters: cleanFilters as ReportFilters,
      };

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

  if (!user) {
    return <p className="text-center mt-6">⚠️ No se encontró el usuario actual.</p>;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Generador de Reportes</h2>
        <form
          className="modal-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
        >
          <p>
            Solicitado por: <strong>{user.name}</strong>
          </p>

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
                {contractTypes.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
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
                {contractStatuses.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
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

          <div className="modal-actions">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Generando..." : "Generar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
