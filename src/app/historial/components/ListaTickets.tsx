"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchTickets } from "../service/ticket_service";
import { assignTicket } from "../service/assign_ticket_service";
import { Ticket } from "../model/ticket_model";
import { useAuth } from "@/context/AuthContext";
import DetalleModal from "./DetalleModal";
import AsignarModal from "./AsignarModal";
import Tabla from "./Tabla";
import Filtros from "./Filtros";
import "./TablaSolicitudes.css";

export default function TablaSolicitudes() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAsignarModal, setShowAsignarModal] = useState(false);
  const [ticketAAsignar, setTicketAAsignar] = useState<number | null>(null);

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

  const abrirModal = (ticketId: number) => {
    setSelectedTicketId(ticketId);
    setShowModal(true);
  };

  const abrirAsignarModal = (ticketId: number) => {
    setTicketAAsignar(ticketId);
    setShowAsignarModal(true);
  };

  const handleAsignacion = async (userId: string) => {
    if (!ticketAAsignar) return;

    const asignacion = toast.promise(
      assignTicket({ ticketId: ticketAAsignar, userId }),
      {
        loading: "Asignando ticket...",
        success: "Ticket asignado correctamente",
        error: "No se pudo asignar el ticket",
      }
    );

    try {
      await asignacion;
    } finally {
      setShowAsignarModal(false);
      setTicketAAsignar(null);
    }
  };

const tiposAclaracion = Array.from(
  new Set(tickets.map(t => t.clarificationType).filter((t): t is string => t !== null && t !== undefined))
);

  return (
    <div className="tabla-solicitudes-container">
      <Filtros
        filtroTipo={filtroTipo}
        setFiltroTipo={setFiltroTipo}
        filtroTiempo={filtroTiempo}
        setFiltroTiempo={setFiltroTiempo}
        filtroAclaracion={filtroAclaracion}
        setFiltroAclaracion={setFiltroAclaracion}
        tiposAclaracion={tiposAclaracion}
      />

      <Tabla
        tickets={tickets}
        loading={loading}
        filtroTipo={filtroTipo}
        filtroTiempo={filtroTiempo}
        filtroAclaracion={filtroAclaracion}
        abrirModal={abrirModal}
        abrirAsignarModal={abrirAsignarModal}
      />

      {showModal && selectedTicketId !== null && (
        <DetalleModal
          ticketId={selectedTicketId}
          onClose={() => {
            setShowModal(false);
            setSelectedTicketId(null);
          }}
        />
      )}

      {showAsignarModal && ticketAAsignar !== null && (
        <AsignarModal
          ticketId={ticketAAsignar}
          onClose={() => {
            setShowAsignarModal(false);
            setTicketAAsignar(null);
          }}
          onSelect={handleAsignacion}
        />
      )}
    </div>
  );
}
