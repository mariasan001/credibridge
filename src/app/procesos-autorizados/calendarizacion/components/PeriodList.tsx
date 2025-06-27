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
        setError("Error al obtener los periodos");
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
      <h2>Lista de Periodos</h2>
      <ul>
        {periods.map((p, index) => (
          <li key={index} className="period-item">
            <strong>{p.period} / {p.year}</strong> — {p.startDate} ➜ {p.endDate}
          </li>
        ))}
      </ul>
    </div>
  );
};
