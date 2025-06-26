"use client";

import { useState } from "react";
import "./ContractsAdminFilters.css";
import { Landmark, Layers, HelpCircle, CalendarDays } from "lucide-react";

interface Props {
  onFilterChange: (filters: FiltersState) => void;
  financieras: string[];
  estatuses: string[];
  servicios: string[];
}

export interface FiltersState {
  servidor: string;
  financiera: string;
  estatus: string;
  servicio: string;
  tiempo: string;
}

export default function ContractsAdminFilters({
  onFilterChange,
  financieras,
  estatuses,
  servicios
}: Props) {
  const [filters, setFilters] = useState<FiltersState>({
    servidor: "",
    financiera: "",
    estatus: "",
    servicio: "",
    tiempo: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="filters-container">
      <div className="filter-group">
        <label htmlFor="servicio">Tipo</label>
        <div className="filter-input">
          <HelpCircle size={16} className="filter-icon" />
          <select name="servicio" id="servicio" value={filters.servicio} onChange={handleChange}>
            <option value="">Todos</option>
            {servicios.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="estatus">Estatus</label>
        <div className="filter-input">
          <Layers size={16} className="filter-icon" />
          <select name="estatus" id="estatus" value={filters.estatus} onChange={handleChange}>
            <option value="">Todos</option>
            {estatuses.map((e, i) => (
              <option key={i} value={e}>{e}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="financiera">Financiera</label>
        <div className="filter-input">
          <Landmark size={16} className="filter-icon" />
          <select name="financiera" id="financiera" value={filters.financiera} onChange={handleChange}>
            <option value="">Todas</option>
            {financieras.map((f, i) => (
              <option key={i} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="tiempo">Tiempo</label>
        <div className="filter-input">
          <CalendarDays size={16} className="filter-icon" />
          <select name="tiempo" id="tiempo" value={filters.tiempo} onChange={handleChange}>
            <option value="">Todo el tiempo</option>
            <option value="30">Últimos 30 días</option>
            <option value="90">Últimos 3 meses</option>
          </select>
        </div>
      </div>
    </div>
  );
}
