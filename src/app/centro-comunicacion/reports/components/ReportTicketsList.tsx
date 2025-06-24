"use client";

import { useState } from "react";
import useSWR from "swr";
import "./report-tickets.css";
import { fetchReportTickets } from "../service/reportTicketsService";
import { TicketModal } from "./TicketModal";
import { useAuth } from "@/context/AuthContext";

export const ReportTicketsList = () => {
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const { user } = useAuth(); // Obtener usuario desde el contexto
  const userId = user?.userId;

  // SWR para obtener los tickets del usuario, con refresh automático cada 10s
  const {
    data: tickets,
    isLoading,
    error,
    mutate, // Permite forzar una recarga si fuera necesario
  } = useSWR(
    userId ? ["report-tickets", userId] : null, // clave única por usuario
    () => fetchReportTickets(userId!),          // función fetch
    {
      refreshInterval: 10000, // ← 10 segundos
      revalidateOnFocus: true,
    }
  );

  const handleOpenModal = (id: number) => setSelectedTicketId(id);
  const handleCloseModal = () => setSelectedTicketId(null);

  const selectedTicket = tickets?.find((t) => t.id === selectedTicketId);

  if (isLoading) return <p>Cargando tickets...</p>;
  if (error) return <p>Error al cargar tickets</p>;
  if (!tickets || tickets.length === 0) return <p>No hay tickets disponibles.</p>;

  return (
    <>
      <div className="tickets-list">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="ticket-card"
            onClick={() => handleOpenModal(ticket.id)}
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
                ·
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

      {/* Modal del ticket seleccionado */}
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={handleCloseModal}
          // Puedes pasar mutate aquí si quieres refrescar la lista desde el modal
        />
      )}
    </>
  );
};
