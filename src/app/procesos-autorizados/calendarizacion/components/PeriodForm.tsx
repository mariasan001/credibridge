"use client";

import { useState } from "react";
import { Period } from "../models/types/period";
import { createPeriod } from "../service/periodService";
// @ts-ignore
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import toast from "react-hot-toast";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import "./PeriodForm.css";

const initialForm: Period = {
  period: 0,
  year: 0,
  startDate: "",
  endDate: "",
};

export const PeriodForm = ({ onPeriodCreated }: { onPeriodCreated: () => void }) => {
  const [formData, setFormData] = useState<Period>(initialForm);
  const [loading, setLoading] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
  ]);

  const handleDateChange = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange([ranges.selection]);

    setFormData(prev => ({
      ...prev,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createPeriod(formData);
      toast.success("✅ Periodo creado exitosamente");
      setFormData(initialForm);
      onPeriodCreated(); // <-- actualiza lista
    } catch (err: any) {
      toast.error(err.response?.data?.message || "❌ Error al crear el periodo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="period-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="period">Periodo</label>
          <input
            id="period"
            name="period"
            value={formData.period}
            onChange={handleChange}
            type="number"
            className="form-input"
            placeholder="Ej. 1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Año</label>
          <input
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            type="number"
            className="form-input"
            placeholder="Ej. 2025"
          />
        </div>
      </div>

      <div className="calendar-container">
        <div className="calendar-title">Selecciona el rango de fechas</div>
        <DateRange
          editableDateInputs={true}
          onChange={handleDateChange}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
        />
      </div>

      <button type="submit" disabled={loading} className="form-button">
        {loading ? "Creando..." : "Crear Periodo"}
      </button>
    </form>
  );
};
