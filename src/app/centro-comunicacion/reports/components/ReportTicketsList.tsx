"use client";

import useSWR from "swr";
import "./report-tickets.css";
import { fetchReportTickets } from "../service/reportTicketsService";
import { TicketModal } from "./TicketModal";
import { useAuth } from "@/context/AuthContext";
import { ReportTicket } from "../model/reportTicket.model";
interface Props {
  selectedTicketId: number | null;
  onSelectTicket: (ticket: ReportTicket) => void;
  showModal: boolean;
  onCloseModal: () => void;
  ticketsRolesAllowed: boolean;
  ticketFilter?: (ticket: ReportTicket) => boolean; // ✅ NUEVO
}

export const ReportTicketsList = ({
  selectedTicketId,
  onSelectTicket,
  showModal,
  onCloseModal,
  ticketsRolesAllowed,
  ticketFilter, // ✅ NUEVO
}: Props) => {
  const { user } = useAuth();
  const userId = user?.userId;

  const { data: tickets, isLoading, error } = useSWR(
    ticketsRolesAllowed && userId ? ["report-tickets", userId] : null,
    () => fetchReportTickets(userId!),
    {
      refreshInterval: 10000,
      revalidateOnFocus: true,
    }
  );

  const selectedTicket = tickets?.find((t) => t.id === selectedTicketId);

  if (isLoading) return <p>Cargando tickets...</p>;
  if (error) return <p>Error al cargar tickets.</p>;
  if (!tickets || tickets.length === 0) return <p>No hay tickets disponibles.</p>;

  // ✅ Aplica el filtro si existe
  const filteredTickets = ticketFilter ? tickets.filter(ticketFilter) : tickets;

  return (
    <>
      <div className="tickets-list">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`ticket-card ${selectedTicketId === ticket.id ? "activo" : ""}`}
            onClick={() => onSelectTicket(ticket)}
          >
            <div className="ticket-icon">{ticket.ticket.ticketType[0] || "?"}</div>

            <div className="ticket-content">
              <h4>{ticket.ticket.subject}</h4>
              <p className="ticket-description">{ticket.ticket.description}</p>

              <div className="ticket-tags">
                <span className="ticket-tag">{ticket.ticket.ticketType}</span>
                {ticket.ticket.clarificationType && (
                  <span className="ticket-tag tag-alt">
                    {ticket.ticket.clarificationType}
                  </span>
                )}
              </div>

              <div className="ticket-meta">
                <span>
                  Estado: <strong>{ticket.status}</strong>
                </span>{" "}
                ·{" "}
                <span>
                  Fecha:{" "}
                  {new Date(ticket.ticket.creationDate).toLocaleDateString("es-MX")}
                </span>
              </div>
            </div>

            <div className="ticket-extra">
              <span className="ticket-id">#{ticket.id}</span>
              <span className="ticket-from">Usuario: {ticket.ticket.user}</span>
              <span className="ticket-date">
                Última respuesta:{" "}
                {new Date(ticket.ticket.lastResponse).toLocaleDateString("es-MX")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedTicket && (
        <TicketModal ticket={selectedTicket} onClose={onCloseModal} />
      )}
    </>
  );
};
