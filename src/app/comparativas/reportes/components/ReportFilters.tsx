import "./ReportFilters.css";

interface ReportFiltersProps {
  filtroTipo: string;
  setFiltroTipo: (val: string) => void;
  filtroEstatus: string;
  setFiltroEstatus: (val: string) => void;
  filtroFecha: string;
  setFiltroFecha: (val: string) => void;
}

export const ReportFilters = ({
  filtroTipo,
  setFiltroTipo,
  filtroEstatus,
  setFiltroEstatus,
  filtroFecha,
  setFiltroFecha,
}: ReportFiltersProps) => {
  return (
    <div className="report-filters-container">
      <div className="filtro-item">
        <label>Tipo:</label>
        <input
          type="text"
          placeholder="Filtrar tipo"
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="filtro-input"
        />
      </div>
      <div className="filtro-item">
        <label>Estatus:</label>
        <input
          type="text"
          placeholder="Filtrar estatus"
          value={filtroEstatus}
          onChange={(e) => setFiltroEstatus(e.target.value)}
          className="filtro-input"
        />
      </div>
      <div className="filtro-item">
        <label>Fecha:</label>
        <input
          type="text"
          placeholder="Filtrar por fecha (ej. 08 de julio)"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="filtro-input"
        />
      </div>
    </div>
  );
};
