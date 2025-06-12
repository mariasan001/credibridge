interface Props {
  filtroTipo: string;
  setFiltroTipo: (v: string) => void;
  filtroTiempo: string;
  setFiltroTiempo: (v: string) => void;
  filtroAclaracion: string;
  setFiltroAclaracion: (v: string) => void;
  tiposAclaracion: string[];
}

export default function Filtros({
  filtroTipo,
  setFiltroTipo,
  filtroTiempo,
  setFiltroTiempo,
  filtroAclaracion,
  setFiltroAclaracion,
  tiposAclaracion,
}: Props) {
  return (
    <div className="filtros-solicitudes">
      <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
        <option value="TODOS">Todos los tipos</option>
        <option value="SOLICITUD">Solicitud</option>
        <option value="ACLARACION">Aclaración</option>
      </select>

      <select value={filtroTiempo} onChange={(e) => setFiltroTiempo(e.target.value)}>
        <option value="TODOS">Todo el tiempo</option>
        <option value="URGENTE">Urgente</option>
        <option value="NORMAL">Normal</option>
        <option value="REBASADO">Rebasado</option>
      </select>

      <select value={filtroAclaracion} onChange={(e) => setFiltroAclaracion(e.target.value)}>
        <option value="TODOS">Todas las aclaraciones</option>
        {tiposAclaracion.map(tipo => (
          <option key={tipo ?? "vacío"} value={tipo ?? ""}>{tipo ?? "Sin tipo"}</option>
        ))}
      </select>
    </div>
  );
}
