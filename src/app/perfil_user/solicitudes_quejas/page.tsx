"use client";

import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { ListaTickets } from "./components/ListaTickets";
import { useTickets } from "./hook/useTickets";
import { TicketModel } from "./model/TicketModel";
import { ChatTicket } from "./components/ChatTicket";
import { useAuth } from "@/context/AuthContext";
import "./pageSolicitudes.css";

export default function SolicitudesPage() {
  const { tickets, loading } = useTickets();
  const [ticketSeleccionado, setTicketSeleccionado] = useState<TicketModel | null>(null);
  const { user } = useAuth();

  return (
    <PageLayout>
      <div className="solicitudes-page">
        <div className="solicitudes-sidebar">
          <h2 className="titulo-solicitudes">Solicitudes y Quejas</h2>
          {loading ? (
            <p>Cargando solicitudes...</p>
          ) : (
            <ListaTickets
              tickets={tickets}
              onSelectTicket={setTicketSeleccionado}
            />
          )}
        </div>

        <div className="solicitudes-chat">
          {ticketSeleccionado && user ? (
            <ChatTicket
              ticketId={ticketSeleccionado.ticketId}
              userId={user.userId}
            />
          ) : (
            <div className="chat-placeholder">
              <p>Selecciona un ticket para ver la conversación.</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
