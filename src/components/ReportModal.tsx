"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { generateReport } from "@/services/reportService";
import "./ReportModal.css";

export const ReportModal = ({ onClose }: { onClose: () => void }) => {
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
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await generateReport({
                reportType: "CONTRACTS",
                requestedBy: user?.userId || "desconocido",
                filters: {
                    lenderId: Number(filters.lenderId),
                    userRfc: filters.userRfc,
                    contractStatusId: filters.contractStatusId ? Number(filters.contractStatusId) : null,
                    contractType: filters.contractType || null, // 👈 Aquí ya no se convierte a número
                    startDate: filters.startDate || null,
                    endDate: filters.endDate || null,
                },
            });


            setSuccess("✅ Reporte generado correctamente");
        } catch (err) {
            setError("❌ Error al generar el reporte");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Generar Reporte</h2>
                <p>Generado por: <strong>{user?.name}</strong> ({user?.email})</p>

                <form className="modal-form" onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}>
                    <div className="form-group">
                        <label>Tipo de Reporte</label>
                        <input value="CONTRACTS" disabled className="form-input" />
                    </div>

                    <div className="form-group">
                        <label>Lender ID</label>
                        <input
                            type="number"
                            name="lenderId"
                            value={filters.lenderId}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>RFC Usuario</label>
                        <input
                            type="text"
                            name="userRfc"
                            value={filters.userRfc}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Tipo de Contrato</label>
                        <input
                            type="text"
                            name="contractType"
                            value={filters.contractType}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Estatus de Contrato</label>
                        <input
                            type="number"
                            name="contractStatusId"
                            value={filters.contractStatusId}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha Inicio</label>
                        <input
                            type="date"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha Fin</label>
                        <input
                            type="date"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    {success && <p className="success">{success}</p>}
                    {error && <p className="error">{error}</p>}

                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>Cancelar</button>
                        <button type="submit" disabled={loading}>
                            {loading ? "Generando..." : "Generar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
