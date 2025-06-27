"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { generateReport } from "@/services/reportService";
import toast from "react-hot-toast";
import "./ReportModal.css";

type ReportModalProps = {
  onClose: () => void;
  onStart: () => void;      // 🟢 Se ejecuta cuando inicia el reporte
  onFinish: () => void;     // 🔴 Se ejecuta cuando termina
};

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
    const toastId = toast.loading("⏳ Generando reporte...");
    setLoading(true);
    onStart(); // 🟢 Aumenta el contador

    try {
      await generateReport({
        reportType: "CONTRACTS",
        requestedBy: user?.userId || "desconocido",
        filters: {
          lenderId: Number(filters.lenderId),
          userRfc: filters.userRfc,
          contractStatusId: filters.contractStatusId
            ? Number(filters.contractStatusId)
            : null,
          contractType: filters.contractType || null,
          startDate: filters.startDate || null,
          endDate: filters.endDate || null,
        },
      });

      toast.success("✅ Reporte generado correctamente", { id: toastId });
      onClose();
    } catch {
      toast.error("❌ Error al generar el reporte", { id: toastId });
    } finally {
      setLoading(false);
      onFinish(); // 🔴 Disminuye el contador
    }
  };

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
            Solicitado por: <strong>{user?.name}</strong>
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="contractType">Tipo de Contrato</label>
              <input
                id="contractType"
                name="contractType"
                value={filters.contractType}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contractStatusId">Estatus de Contrato</label>
              <input
                id="contractStatusId"
                name="contractStatusId"
                value={filters.contractStatusId}
                onChange={handleChange}
                className="form-input"
              />
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
