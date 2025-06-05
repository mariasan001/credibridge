"use client";

import { TicketModel } from "../model/TicketModel";
import "./ListaTickets.css";

interface Props {
  tickets: TicketModel[];
  onSelectTicket?: (ticket: TicketModel) => void; 
}

export const ListaTickets = ({ tickets, onSelectTicket }: Props) => {
  return (
    <div className="lista-tickets">
      {tickets.map((ticket) => {
        const tipo = ticket.ticketType.toLowerCase(); // 'solicitud' o 'queja'
        const estatus = ticket.status.toLowerCase(); // 'abierto' o 'cerrado'
        const horaUltimaRespuesta = new Date(ticket.lastResponse).toLocaleTimeString("es-MX", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div
            className="ticket-card"
            key={ticket.ticketId}
           onClick={() => {
              console.log("Ticket seleccionado:", ticket.ticketId);
              onSelectTicket?.(ticket);
            }}
          >
            {/* Avatar según tipo */}
            <div className={`ticket-avatar ${tipo}`}>
              {tipo === "solicitud" ? "S" : "Q"}
            </div>

            {/* Contenido del ticket */}
            <div className="ticket-contenido">
              <div className="ticket-titulo">{ticket.lenderName}</div>
              <div className="ticket-linea">{ticket.description}</div>

              <div className="ticket-footer">
                <span className="ticket-hora">{horaUltimaRespuesta}</span>
                <span className={`ticket-status-badge ${estatus}`}>
                  {estatus}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
