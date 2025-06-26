"use client";

import React, { useEffect, useState, useCallback } from "react";
import "./DebtPurchaseList.css";
import { DebtPurchase } from "../../model/DebtPurchase";
import {
  actualizarEstatusSolicitud,
  obtenerSolicitudesDeuda,
} from "../../services/debtPurchaseService";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

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

  const rolId = user?.roles?.[0]?.id;
  const lenderId = user?.lender?.id;

  const esSoloVisualizacion = rolId === 1 || rolId === 2;
  const puedeEditar = rolId === 4 || rolId === 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: DebtPurchase[] = await obtenerSolicitudesDeuda();

        // Siempre eliminar los que tengan status INICIADO
        const sinIniciados = data.filter(
          (s) => s.status.toUpperCase() !== "INICIADO"
        );

        let filtradas: DebtPurchase[] = [];

        if (esSoloVisualizacion) {
          // Roles 1 y 2 → pueden ver todo excepto INICIADO
          filtradas = sinIniciados;
        } else if (puedeEditar && lenderId) {
          // Roles 4 y 5 → solo si su financiera está involucrada y no INICIADO
          filtradas = sinIniciados.filter(
            (s) =>
              s.sellingLenderId === lenderId ||
              s.buyingLenderId === lenderId
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
        prev.map((s) =>
          s.id === id ? { ...s, status: nuevoEstado } : s
        )
      );
      setClicks((prev) => ({ ...prev, [id]: nuevoClick }));
    },
    [clicks]
  );

  return (
    <div className="debt-list-container">
      {loading ? (
        <p>Cargando...</p>
      ) : (
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
              {solicitudes.map((s) => (
                <FilaSolicitud
                  key={s.id}
                  s={s}
                  cambiarStatus={cambiarStatus}
                  puedeCambiar={!esSoloVisualizacion && puedeEditar}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DebtPurchaseList;
