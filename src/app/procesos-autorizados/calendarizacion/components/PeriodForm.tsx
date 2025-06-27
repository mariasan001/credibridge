"use client";

import { useState } from "react";
import { Period } from "../models/types/period";
import { createPeriod } from "../service/periodService";
import "./PeriodForm.css";

const initialForm: Period = {
  period: 0,
  year: 0,
  startDate: "",
  endDate: "",
};

export const PeriodForm = () => {
  const [formData, setFormData] = useState<Period>(initialForm);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      await createPeriod(formData);
      setAlert({ type: "success", message: "✅ Periodo creado exitosamente" });
      setFormData(initialForm);
    } catch (err: any) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "❌ Error al crear el periodo",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="period-form">
      {alert && (
        <div className={`alert ${alert.type === "success" ? "alert-success" : "alert-error"}`}>
          {alert.message}
        </div>
      )}

      <input
        name="period"
        value={formData.period}
        onChange={handleChange}
        type="number"
        className="form-input"
        placeholder="Periodo"
      />

      <input
        name="year"
        value={formData.year}
        onChange={handleChange}
        type="number"
        className="form-input"
        placeholder="Año"
      />

      <input
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        type="date"
        className="form-input"
        placeholder="Fecha de inicio"
      />

      <input
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        type="date"
        className="form-input"
        placeholder="Fecha de fin"
      />

      <button type="submit" disabled={loading} className="form-button">
        {loading ? "Creando..." : "Crear Periodo"}
      </button>
    </form>
  );
};
