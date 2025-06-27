"use client";

import { useEffect, useState } from "react";
import "./ReportsTable.css";
import { Download } from "lucide-react";

import { Report } from "../models/types/report";
import { getReports } from "../services/periodService1";
import { downloadReportById } from "../services/reportService";

export const ReportsTable = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getReports();
                setReports(data);
            } catch (err) {
                setError("Error al obtener reportes");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <p className="loading">Cargando reportes...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="reports-table-container">
            <table className="tabla-reportes">
                <thead>
                    <tr> <th>ID</th>
                        <th>Tipo</th>
                        <th>Estatus</th>
                        <th>Progreso</th>
                        <th>Generado</th>
                        <th>Finalizado</th>
                        <th>Descargar</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((r) => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.reportType}</td>
                            <td>{r.status}</td>
                            <td>{r.progress}%</td>
                            <td>{r.createdAt}</td>
                            <td>{r.finishedAt}</td>
                            <td className="descargar-icono">
                                <td className="descargar-icono">
                                    <button
                                        className="icon-view"
                                        onClick={() => downloadReportById(r.id)}
                                        title="Descargar reporte"
                                    >
                                        <Download size={18} />
                                    </button>
                                </td>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
