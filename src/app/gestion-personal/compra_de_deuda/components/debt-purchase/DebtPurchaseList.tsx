"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import "./DebtPurchaseList.css";
import { DebtPurchase } from "../../model/DebtPurchase";
import {
  actualizarEstatusSolicitud,
  obtenerSolicitudesDeuda,
} from "../../services/debtPurchaseService";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import DebtFilters from "./DebtFiltersRow";
import StatusBarChart from "./StatusBarChart";

const formatoMoneda = (valor: number | null | undefined) =>
  typeof valor === "number"
    ? valor.toLocaleString("es-MX", { style: "currency", currency: "MXN" })
    : "-";

const capitalizar = (texto: string) =>
  texto ? texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase() : "";

const formatoFecha = (fecha: string | null | undefined) => {
  if (!fecha) return "-";
  const d = new Date(fecha);
  return isNaN(d.getTime()) ? "-" : d.toLocaleString();
};

const FilaSolicitud = React.memo(
  ({
    s,
    cambiarStatus,
    puedeCambiar,
  }: {
    s: DebtPurchase;
    cambiarStatus: (id: number, currentStatus: string) => void;
    puedeCambiar: boolean;
  }) => {
    return (
      <tr>
        <td>{s.id}</td>
        <td>{s.contractId}</td>
        <td>{capitalizar(s.beneficiaryName || "-")}</td>
        <td>{s.beneficiaryRfc || "-"}</td>
        <td className="center-text">{s.cartaAutorizacionPath ? "✅" : ""}</td>
        <td>{s.newContractId || "-"}</td>
        <td>
          <span
            className={`tag-status ${s.status.toLowerCase().replaceAll(" ", "-")} ${puedeCambiar ? "clickable" : ""}`}
            onClick={() => puedeCambiar && cambiarStatus(s.id, s.status)}
            title={puedeCambiar ? "Cambiar estado" : "Solo lectura"}
          >
            {capitalizar(s.status)}
          </span>
        </td>
        <td className="center-text">{s.installmentsToCover ?? "-"}</td>
        <td className="center-text">{formatoMoneda(s.biweeklyDiscount)}</td>
        <td className="center-text">{formatoMoneda(s.outstandingBalance)}</td>
        <td className="center-text">{formatoFecha(s.createdAt)}</td>
        <td className="center-text">{formatoFecha(s.updatedAt)}</td>
      </tr>
    );
  }
);

const DebtPurchaseList = () => {
  const { user } = useAuth();
  const [solicitudes, setSolicitudes] = useState<DebtPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [clicks, setClicks] = useState<{ [id: number]: number }>({});
  const [filtros, setFiltros] = useState({
    id: "",
    contractId: "",
    beneficiaryName: "",
    beneficiaryRfc: "",
    status: "",
  });

  const [leftWidth, setLeftWidth] = useState(0); // inicia colapsado
  const [mostrarGrafica, setMostrarGrafica] = useState(false); // gráfica oculta al inicio
  const [mostrarTabla, setMostrarTabla] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const rolId = user?.roles?.[0]?.id;
  const lenderId = user?.lender?.id;

  const esSoloVisualizacion = rolId === 1 || rolId === 2;
  const puedeEditar = rolId === 4 || rolId === 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: DebtPurchase[] = await obtenerSolicitudesDeuda();
        const sinIniciados = data.filter(
          (s) => s.status.toUpperCase() !== "INICIADO"
        );

        let filtradas: DebtPurchase[] = [];

        if (esSoloVisualizacion) {
          filtradas = sinIniciados;
        } else if (puedeEditar && lenderId) {
          filtradas = sinIniciados.filter(
            (s) =>
              s.sellingLenderId === lenderId || s.buyingLenderId === lenderId
          );
        }

        setSolicitudes(filtradas);
      } catch (error) {
        toast.error("Error al cargar solicitudes.");
        console.error("Error al obtener solicitudes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [esSoloVisualizacion, puedeEditar, lenderId]);

  const cambiarStatus = useCallback(
    async (id: number, currentStatus: string) => {
      const nuevoClick = (clicks[id] || 0) + 1;
      const nuevoEstado = nuevoClick % 2 === 1 ? "LIBERADO" : "BLOQUEADO";

      await toast.promise(actualizarEstatusSolicitud(id, nuevoEstado), {
        loading: `Actualizando a ${capitalizar(nuevoEstado)}...`,
        success: "¡Estado actualizado!",
        error: "Error al actualizar el estado",
      });

      setSolicitudes((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: nuevoEstado } : s))
      );
      setClicks((prev) => ({ ...prev, [id]: nuevoClick }));
    },
    [clicks]
  );

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
    <div className="split-container" ref={containerRef}>
      {mostrarGrafica ? (
        <div className="left-panel" style={{ width: `${leftWidth}%` }}>
          {loading ? <p>Cargando gráfica...</p> : <StatusBarChart solicitudes={solicitudes} />}
        </div>
      ) : (
        <div className="left-collapsed">
          <button
            onClick={() => {
              setMostrarGrafica(true);
              setLeftWidth(40);
            }}
            disabled={solicitudes.length === 0}
            className={`btn-mostrar-grafica ${solicitudes.length === 0 ? "disabled" : ""}`}
            title={solicitudes.length === 0 ? "Sin datos para mostrar la gráfica" : "Mostrar gráfica"}
          >
            Mostrar gráfica
          </button>
        </div>
      )}

      <div className="resizer" onMouseDown={iniciarDrag} />

      {mostrarTabla ? (
        <div className="right-panel" style={{ width: `${100 - leftWidth}%` }}>
          {loading ? (
            <p>Cargando tabla...</p>
          ) : (
            <>
              <DebtFilters filtros={filtros} setFiltros={setFiltros} />
              <div className="debt-table-responsive">
                <table className="debt-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Contrato ID</th>
                      <th>Nombre Beneficiario</th>
                      <th>RFC Beneficiario</th>
                      <th>Carta Autorización</th>
                      <th>Contrato Nuevo</th>
                      <th>Status</th>
                      <th className="center-text">Pagos por Cubrir</th>
                      <th className="center-text">Descuento Quincenal</th>
                      <th className="center-text">Saldo Pendiente</th>
                      <th className="center-text">Fecha Creación</th>
                      <th className="center-text">Fecha Actualización</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitudes.length === 0 ? (
                      <tr>
                        <td colSpan={13}>
                          <div className="empty-state-solicitudes">
                            <img
                              src="/img/sin_doc.png"
                              alt="Sin solicitudes"
                              className="empty-solicitudes-img"
                            />
                            <h2>No hay solicitudes registradas aún</h2>
                            <p>Las solicitudes de compra de deuda aparecerán aquí en cuanto estén disponibles.</p>
                            <p className="motivador">¿Esperando el primer movimiento? Aquí lo verás todo cuando empiece.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      solicitudes
                        .filter((s) => {
                          const idOk = filtros.id === "" || String(s.id).includes(filtros.id);
                          const contractOk = filtros.contractId === "" || s.contractId?.toString().toLowerCase().includes(filtros.contractId.toLowerCase());
                          const nameOk = filtros.beneficiaryName === "" || s.beneficiaryName?.toLowerCase().includes(filtros.beneficiaryName.toLowerCase());
                          const rfcOk = filtros.beneficiaryRfc === "" || s.beneficiaryRfc?.toLowerCase().includes(filtros.beneficiaryRfc.toLowerCase());
                          const statusOk = filtros.status === "" || s.status?.toLowerCase().includes(filtros.status.toLowerCase());
                          return idOk && contractOk && nameOk && rfcOk && statusOk;
                        })
                        .map((s) => (
                          <FilaSolicitud
                            key={s.id}
                            s={s}
                            cambiarStatus={cambiarStatus}
                            puedeCambiar={!esSoloVisualizacion && puedeEditar}
                          />
                        ))
                    )}
                  </tbody>
                </table>
              </div>
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
  );
};

export default DebtPurchaseList;
