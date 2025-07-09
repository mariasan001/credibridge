"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";


import { Ticket } from "../model/ticket_model";
import { fetchTicketsByStatus } from "../service/ticket_service";
import { assignTicket } from "../service/assign_ticket_service";

import DetalleModal from "./DetalleModal";
import AsignarModal from "./AsignarModal";
import Tabla from "./Tabla";
import Filtros from "./Filtros";
import { Pagination } from "@/app/cartera-clientes/components/Pagination";

import "./TablaSolicitudes.css";
import { useAuth } from "@/hooks/useAuth";

export default function TablaSolicitudes() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [showModalDetalle, setShowModalDetalle] = useState(false);

  const [ticketAAsignar, setTicketAAsignar] = useState<number | null>(null);
  const [showModalAsignar, setShowModalAsignar] = useState(false);

  const [filtroTipo, setFiltroTipo] = useState("TODOS");
  const [filtroTiempo, setFiltroTiempo] = useState("TODOS");
  const [filtroAclaracion, setFiltroAclaracion] = useState("TODOS");

  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const cargarTickets = async () => {
    setLoading(true);
    try {
      const data = await fetchTicketsByStatus([1, 2, 3], pagina, 10);
      const solicitudes = data.content.filter(ticket => ticket.ticketType === "SOLICITUD");
      setTickets(solicitudes);
      setTotalPaginas(data.totalPages);
    } catch (error) {
      console.error("❌ Error al cargar tickets:", error);
      toast.error("No se pudieron cargar los tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTickets();
  }, [pagina]);

  const abrirModalDetalle = (ticketId: number) => {
    setSelectedTicketId(ticketId);
    setShowModalDetalle(true);
  };

  const abrirModalAsignar = (ticketId: number) => {
    setTicketAAsignar(ticketId);
    setShowModalAsignar(true);
  };

  const handleAsignacion = async (userId: string) => {
    if (!ticketAAsignar) return;

    try {
      await toast.promise(
        assignTicket({ ticketId: ticketAAsignar, userId }),
        {
          loading: "Asignando ticket...",
          success: "✅ Ticket asignado correctamente",
          error: "❌ Error al asignar el ticket",
        }
      );
      await cargarTickets(); // Opcional: recargar lista tras asignar
    } catch (err) {
      console.error("❌ Error al asignar:", err);
    } finally {
      setShowModalAsignar(false);
      setTicketAAsignar(null);
    }
  };

  const tiposAclaracion = Array.from(
    new Set(tickets.map(t => t.clarificationType).filter((t): t is string => !!t))
  );

  if (!user) return null;

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
        abrirModal={abrirModalDetalle}
        abrirAsignarModal={abrirModalAsignar}
      />

      <Pagination
        currentPage={pagina + 1}
        totalPages={totalPaginas}
        onPageChange={(newPage) => setPagina(newPage - 1)}
      />

      {showModalDetalle && selectedTicketId !== null && (
        <DetalleModal
          ticketId={selectedTicketId}
          onClose={() => {
            setShowModalDetalle(false);
            setSelectedTicketId(null);
          }}
        />
      )}

      {showModalAsignar && ticketAAsignar !== null && (
        <AsignarModal
          ticketId={ticketAAsignar}
          onClose={() => {
            setShowModalAsignar(false);
            setTicketAAsignar(null);
          }}
          onSelect={handleAsignacion}
        />
      )}
    </div>
  );
}
