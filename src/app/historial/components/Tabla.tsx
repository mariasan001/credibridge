import { Eye } from "lucide-react";
import { Ticket } from "../model/ticket_model";
import { calcularDiasRestantes, capitalizarNombre, formatearFecha } from "../utils/format_helpers";

interface Props {
  tickets: Ticket[];
  loading: boolean;
  filtroTipo: string;
  filtroTiempo: string;
  filtroAclaracion: string;
  abrirModal: (ticketId: number) => void;
  abrirAsignarModal: (ticketId: number) => void;
}

export default function Tabla({
  tickets,
  loading,
  filtroTipo,
  filtroTiempo,
  filtroAclaracion,
  abrirModal,
  abrirAsignarModal,
}: Props) {
  const ticketsFiltrados = tickets.filter(ticket => {
    if (filtroTipo !== "TODOS" && ticket.ticketType !== filtroTipo) return false;
    if (filtroAclaracion !== "TODOS" && ticket.clarificationType !== filtroAclaracion) return false;

    const tiempo = calcularDiasRestantes(ticket.creationDate);
    if (
      (filtroTiempo === "URGENTE" && tiempo.clase !== "tiempo-urgente") ||
      (filtroTiempo === "NORMAL" && tiempo.clase !== "tiempo-normal") ||
      (filtroTiempo === "REBASADO" && tiempo.clase !== "tiempo-rebasado")
    ) return false;

    return true;
  });

  if (loading) return <p>Cargando solicitudes...</p>;
  if (ticketsFiltrados.length === 0) return <p>No hay solicitudes pendientes.</p>;

  return (
    <table className="tabla-contratos tabla-solicitudes">
      <thead>
        <tr>
          <th>Financiera</th>
          <th>Nombre del Usuario</th>
          <th>Tipo de Aclaración</th>
          <th>Fecha de Creación</th>
          <th>Estatus</th>
          <th>Tiempo restante</th>
          <th>Asignado a</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        {ticketsFiltrados.map(ticket => {
          const tiempo = calcularDiasRestantes(ticket.creationDate);
          const nombre = capitalizarNombre(ticket.user);
          const fecha = formatearFecha(ticket.creationDate);

          return (
            <tr key={ticket.ticketId}>
              <td className="cell-ellipsis">{ticket.lenderName || "#"}</td>
              <td className="cell-ellipsis">{nombre}</td>
              <td className="cell-ellipsis">{ticket.clarificationType || "—"}</td>
              <td className="cell-ellipsis">{fecha}</td>
              <td>
                <span className={`status-tag ${ticket.status.toLowerCase()}`}>
                  {ticket.status}
                </span>
              </td>
              <td className="cell-ellipsis">
                <span className={`tiempo-tag ${tiempo.clase}`}>{tiempo.texto}</span>
              </td>
              <td className="cell-ellipsis">
                <span
                  className="link-asignar"
                  onClick={() => abrirAsignarModal(ticket.ticketId)}
                  title="Editar asignación"
                  style={{ cursor: "pointer" }}
                >
                  {ticket.assignedTo
                    ? capitalizarNombre(ticket.assignedTo)
                    : "No asignado"}
                </span>
              </td>

              <td>
                <Eye className="icon-view" onClick={() => abrirModal(ticket.ticketId)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
