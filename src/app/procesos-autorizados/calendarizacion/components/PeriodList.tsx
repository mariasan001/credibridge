"use client";

import { useEffect, useState } from "react";
import { getPeriods } from "../service/periodService";
import { Period } from "../models/types/period";
import "./PeriodList.css";

export const PeriodList = () => {
  const [periods, setPeriods] = useState<Period[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        const data = await getPeriods();
        setPeriods(data);
      } catch (err: any) {
        setError("❌ Error al obtener los periodos");
      } finally {
        setLoading(false);
      }
    };

    fetchPeriods();
  }, []);

  if (loading) return <p className="loading">Cargando periodos...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="period-list">
      <h2 className="list-title">📅 Lista de Periodos Registrados</h2>
      <div className="period-cards">
        {periods.map((p, index) => (
          <div key={index} className="period-card">
            <div className="period-header">
              <span className="period-label">Periodo:</span>
              <span className="period-value">{p.period} / {p.year}</span>
            </div>
            <div className="period-dates">
              <span className="date-range">{p.startDate} ➜ {p.endDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
