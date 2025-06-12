"use client";

import { useEffect, useState } from "react";
import { Ticket } from "../model/ticket_model";
import { fetchTickets } from "../service/ticket_service";
import { useAuth } from "@/context/AuthContext";
import { Eye } from "lucide-react";
import DetalleModal from "./DetalleModal";
import "./TablaSolicitudes.css";

export default function TablaSolicitudes() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [filtroTipo, setFiltroTipo] = useState("TODOS");
  const [filtroTiempo, setFiltroTiempo] = useState("TODOS");
  const [filtroAclaracion, setFiltroAclaracion] = useState("TODOS");

  useEffect(() => {
    fetchTickets()
      .then(data => {
        const solicitudes = data.filter(ticket => ticket.ticketType === "SOLICITUD");
        setTickets(solicitudes);
      })
      .finally(() => setLoading(false));
  }, []);

  const capitalizarNombre = (nombreCompleto: string) =>
    nombreCompleto
      .toLowerCase()
      .split(" ")
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");

  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return new Intl.DateTimeFormat("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(fecha);
  };

  const calcularDiasRestantes = (fechaCreacion: string) => {
    const fechaInicio = new Date(fechaCreacion);
    const hoy = new Date();
    const diferencia = Math.floor((fechaInicio.getTime() + 16 * 86400000 - hoy.getTime()) / 86400000);

    if (diferencia < 0) return { texto: "Rebasado", clase: "tiempo-rebasado" };
    if (diferencia <= 1) return { texto: `Expira en ${diferencia} día`, clase: "tiempo-urgente" };
    return { texto: `Expira en ${diferencia} días`, clase: "tiempo-normal" };
  };

  const abrirModal = (ticketId: number) => {
    setSelectedTicketId(ticketId);
    setShowModal(true);
  };

  const tiposAclaracion = Array.from(new Set(tickets.map(t => t.clarificationType).filter(Boolean)));

  return (
    <div className="tabla-solicitudes-container">
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

      {loading ? (
        <p>Cargando solicitudes...</p>
      ) : tickets.length === 0 ? (
        <p>No hay solicitudes pendientes.</p>
      ) : (
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
            {tickets
              .filter(ticket => {
                if (filtroTipo !== "TODOS" && ticket.ticketType !== filtroTipo) return false;
                if (filtroAclaracion !== "TODOS" && ticket.clarificationType !== filtroAclaracion) return false;

                const tiempo = calcularDiasRestantes(ticket.creationDate);
                if (
                  (filtroTiempo === "URGENTE" && tiempo.clase !== "tiempo-urgente") ||
                  (filtroTiempo === "NORMAL" && tiempo.clase !== "tiempo-normal") ||
                  (filtroTiempo === "REBASADO" && tiempo.clase !== "tiempo-rebasado")
                ) return false;

                return true;
              })
              .map(ticket => {
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
                      {ticket.assignedTo
                        ? capitalizarNombre(ticket.assignedTo)
                        : "Sin asignar"}
                    </td>
                    <td>
                      <Eye className="icon-view" onClick={() => abrirModal(ticket.ticketId)} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}

      {showModal && selectedTicketId !== null && (
        <DetalleModal
          ticketId={selectedTicketId}
          onClose={() => {
            setShowModal(false);
            setSelectedTicketId(null);
          }}
        />
      )}
    </div>
  );
}
