"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Ticket } from "./model/ticket.model";
import TicketsTableAdmin from "./components/TicketsTableAdmin";
import { PageLayout } from "@/components/PageLayout";
import { fetchTicketsByStatus1 } from "./services/ticket.service";
import ResumenSolicitudesAdmin from "./components/ResumenSolicitudesAdmin";
import FiltrosSolicitudesAdmin from "./components/FiltrosSolicitudesAdmin";
import { Pagination } from "../cartera-clientes/components/Pagination";
import { CarteraHeader } from "./components/headerSolicitudes";
import { filtrarPorTiempo } from "./utils/filters";

export default function TicketsPageAdmin() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [filtros, setFiltros] = useState({
    tipo: "TODOS",
    estatus: "TODOS",
    financiera: "TODAS",
    tiempo: "TODO"
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchTicketsByStatus1([1, 2, 3], {
        page: currentPage - 1,
        size: 10
      });
      setTickets(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error al obtener tickets:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFiltroChange = useCallback((nuevoFiltro: typeof filtros) => {
    setFiltros(nuevoFiltro);
    setCurrentPage(1);
  }, []);

  const ticketsFiltrados = useMemo(() => {
    return tickets
      .filter(t => filtros.tipo === "TODOS" || t.ticketType === filtros.tipo)
      .filter(t => filtros.estatus === "TODOS" || t.status === filtros.estatus)
      .filter(t => filtros.financiera === "TODAS" || t.lenderName === filtros.financiera)
      .filter(t => filtrarPorTiempo(t.creationDate, filtros.tiempo));
  }, [tickets, filtros]);

  return (
    <PageLayout>
      <CarteraHeader />

      {!loading && (
        <>
          <ResumenSolicitudesAdmin tickets={ticketsFiltrados} />
          <FiltrosSolicitudesAdmin tickets={tickets} onChange={handleFiltroChange} />
        </>
      )}

      <TicketsTableAdmin tickets={ticketsFiltrados} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </PageLayout>
  );
}
