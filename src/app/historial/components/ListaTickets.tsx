"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Ticket } from "../model/ticket_model";
import { useAuth } from "@/context/AuthContext";
import DetalleModal from "./DetalleModal";
import AsignarModal from "./AsignarModal";
import Tabla from "./Tabla";
import Filtros from "./Filtros";

import "./TablaSolicitudes.css";

import { fetchTicketsByStatus } from "../service/ticket_service";
import { assignTicket } from "../service/assign_ticket_service";
import { Pagination } from "@/app/cartera-clientes/components/Pagination";

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

  // Paginación
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const cargarTickets = async () => {
    setLoading(true);
    try {
      const data = await fetchTicketsByStatus([1, 2, 3], pagina, 10);
      const solicitudes = data.content.filter(ticket => ticket.ticketType === "SOLICITUD");
      setTickets(solicitudes);
      setTotalPaginas(data.totalPages);
    } catch (err) {
      toast.error("Error al cargar tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTickets();
  }, [pagina]);

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
    new Set(tickets.map(t => t.clarificationType).filter((t): t is string => !!t))
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

      <Pagination
        currentPage={pagina + 1}
        totalPages={totalPaginas}
        onPageChange={(newPage) => setPagina(newPage - 1)}
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
