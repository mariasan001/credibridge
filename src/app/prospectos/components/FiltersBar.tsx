import React from "react";
import "./FiltersBar.css";

interface Props {
  filtros: {
    userId: string;
    fechaRango: string;
    servicio: string;
    status: string;
  };
  setFiltros: (filtros: Props["filtros"]) => void;
  setPage: (page: number) => void;
}

const FECHA_OPTIONS = [
  { label: "Hoy", value: "hoy" },
  { label: "Esta semana", value: "semana" },
  { label: "Este mes", value: "mes" },
  { label: "Este trimestre", value: "trimestre" },
  { label: "Este año", value: "año" },
];

const SERVICIO_OPTIONS = ["préstamo", "seguro", "producto", "otro"];
const ESTATUS_OPTIONS = ["reserva", "activo", "inactivo", "pendiente", "proceso", "cancelado"];

export const FiltersBar = ({ filtros, setFiltros, setPage }: Props) => {
  const handleChange = (field: keyof Props["filtros"]) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFiltros({ ...filtros, [field]: e.target.value });
    setPage(1);
  };

  return (
    <div className="filters-bar">
      <input
        type="text"
        placeholder="Buscar por Num. Servidor"
        value={filtros.userId}
        onChange={handleChange("userId")}
      />
      <select value={filtros.fechaRango} onChange={handleChange("fechaRango")}>
        <option value="">Rango de fecha</option>
        {FECHA_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <select value={filtros.servicio} onChange={handleChange("servicio")}>
        <option value="">Tipo de servicio</option>
        {SERVICIO_OPTIONS.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <select value={filtros.status} onChange={handleChange("status")}>
        <option value="">Estatus</option>
        {ESTATUS_OPTIONS.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};
