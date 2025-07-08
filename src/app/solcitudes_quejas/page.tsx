"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { Ticket } from "./model/ticket.model";
import TicketsTableAdmin from "./components/TicketsTableAdmin";
import { PageLayout } from "@/components/PageLayout";
import { fetchTicketsByStatus1 } from "./services/ticket.service";
import FiltrosSolicitudesAdmin from "./components/FiltrosSolicitudesAdmin";
import { Pagination } from "../cartera-clientes/components/Pagination";
import { CarteraHeader } from "./components/headerSolicitudes";
import { filtrarPorTiempo } from "./utils/filters";
import DashboardVisual from "./components/DashboardVisual";

import "./TicketsPageAdmin.css"; // Estilos para el layout dividido

export default function TicketsPageAdmin() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [filtros, setFiltros] = useState({
    tipo: "TODOS",
    estatus: "TODOS",
    financiera: "TODAS",
    tiempo: "TODO",
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchTicketsByStatus1([1, 2, 3], {
        page: currentPage - 1,
        size: 10,
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
      .filter((t) => filtros.tipo === "TODOS" || t.ticketType === filtros.tipo)
      .filter((t) => filtros.estatus === "TODOS" || t.status === filtros.estatus)
      .filter((t) => filtros.financiera === "TODAS" || t.lenderName === filtros.financiera)
      .filter((t) => filtrarPorTiempo(t.creationDate, filtros.tiempo));
  }, [tickets, filtros]);

  // Estados del layout dividido
  const [leftWidth, setLeftWidth] = useState(0); // Inicialmente gráfica colapsada
  const [mostrarGrafica, setMostrarGrafica] = useState(false);
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const iniciarDrag = () => {
    isDragging.current = true;
    document.addEventListener("mousemove", moverSeparador);
    document.addEventListener("mouseup", finalizarDrag);
  };

  const moverSeparador = (e: MouseEvent) => {
    if (!containerRef.current || !isDragging.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const nuevaAnchoIzquierda = (e.clientX / containerWidth) * 100;

    if (nuevaAnchoIzquierda < 10) {
      setMostrarGrafica(false);
      setLeftWidth(0);
    } else if (nuevaAnchoIzquierda > 90) {
      setMostrarTabla(false);
      setLeftWidth(100);
    } else {
      setMostrarGrafica(true);
      setMostrarTabla(true);
      setLeftWidth(nuevaAnchoIzquierda);
    }
  };

  const finalizarDrag = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", moverSeparador);
    document.removeEventListener("mouseup", finalizarDrag);
  };

  return (
    <PageLayout>
      <CarteraHeader />

      <div className="split-container" ref={containerRef}>
        {mostrarGrafica ? (
          <div className="left-panel" style={{ width: `${leftWidth}%` }}>
            <DashboardVisual />
          </div>
        ) : (
          <div className="left-collapsed">
            <button
              onClick={() => {
                setMostrarGrafica(true);
                setLeftWidth(40);
              }}
            >
              Mostrar gráfica
            </button>
          </div>
        )}

        <div className="resizer" onMouseDown={iniciarDrag} />

        {mostrarTabla ? (
          <div className="right-panel" style={{ width: `${100 - leftWidth}%` }}>
            {!loading && (
              <>
                <FiltrosSolicitudesAdmin tickets={tickets} onChange={handleFiltroChange} />
                <TicketsTableAdmin tickets={ticketsFiltrados} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        ) : (
          <div className="right-collapsed">
            <button
              onClick={() => {
                setMostrarTabla(true);
                setLeftWidth(60);
              }}
            >
              Mostrar tabla
            </button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
