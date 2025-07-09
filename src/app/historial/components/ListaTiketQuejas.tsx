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
  const { user, isAuthenticated, loading } = useAuth();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);

  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [ticketAAsignar, setTicketAAsignar] = useState<number | null>(null);
  const [showAsignarModal, setShowAsignarModal] = useState(false);

  const [filtroTipo, setFiltroTipo] = useState("TODOS");
  const [filtroTiempo, setFiltroTiempo] = useState("TODOS");
  const [filtroAclaracion, setFiltroAclaracion] = useState("TODOS");

  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  // 🔄 Carga de tickets
  const cargarTickets = async () => {
    setIsLoadingTickets(true);
    try {
      const data = await fetchTicketsByStatus([1, 2, 3], pagina, 10);
      const quejas = data.content.filter(ticket => ticket.ticketType === "QUEJA");
      setTickets(quejas);
      setTotalPaginas(data.totalPages);
    } catch (err) {
      toast.error("Error al cargar tickets");
      console.error("❌ Error:", err);
    } finally {
      setIsLoadingTickets(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      cargarTickets();
    }
  }, [pagina, isAuthenticated]);

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

    try {
      await toast.promise(
        assignTicket({ ticketId: ticketAAsignar, userId }),
        {
          loading: "Asignando ticket...",
          success: "✅ Ticket asignado",
          error: "❌ No se pudo asignar",
        }
      );
      await cargarTickets(); // Recarga tras asignación
    } finally {
      setShowAsignarModal(false);
      setTicketAAsignar(null);
    }
  };

  const tiposAclaracion = Array.from(
    new Set(tickets.map(t => t.clarificationType).filter((t): t is string => !!t))
  );

  // 🔐 Mientras carga el auth context
  if (loading) return null;

  // ⛔ Usuario no autenticado
  if (!isAuthenticated || !user) {
    return (
      <div className="tabla-solicitudes-container">
        <p className="text-center mt-10 text-red-600 font-semibold">
          ⚠️ No tienes acceso. Inicia sesión para continuar.
        </p>
      </div>
    );
  }

  // ✅ Render principal
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
        loading={isLoadingTickets}
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
