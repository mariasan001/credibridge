"use client";

import React, { useEffect, useState } from "react";
import "./DebtPurchaseList.css";
import { DebtPurchase } from "../../model/DebtPurchase";
import { actualizarEstatusSolicitud, obtenerSolicitudesDeuda } from "../../services/debtPurchaseService";


const formatoMoneda = (valor: number | null | undefined) => {
  if (typeof valor !== "number") return "-";
  return valor.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
};

const formatoFecha = (fecha: string | null | undefined) => {
  if (!fecha) return "-";
  const d = new Date(fecha);
  return isNaN(d.getTime()) ? "-" : d.toLocaleString();
};

const DebtPurchaseList = () => {
  const [solicitudes, setSolicitudes] = useState<DebtPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [clicks, setClicks] = useState<{ [id: number]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerSolicitudesDeuda();
        const filtradas = data.filter((s: DebtPurchase) => s.status !== "INICIADO");
        setSolicitudes(filtradas);
      } catch (error) {
        console.error("Error al obtener solicitudes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

const cambiarStatus = async (id: number, currentStatus: string) => {
  const nuevoClick = (clicks[id] || 0) + 1;
  const nuevoEstado = nuevoClick % 2 === 1 ? "LIBERADO" : "BLOQUEADO";

  try {
    console.log(`🔄 Enviando cambio de estado a "${nuevoEstado}" para solicitud #${id}`);

    await actualizarEstatusSolicitud(id, nuevoEstado);

    setSolicitudes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: nuevoEstado } : s))
    );

    setClicks((prev) => ({ ...prev, [id]: nuevoClick }));

    console.log("✅ Estado actualizado correctamente");
  } catch (error: any) {
    console.error("❌ Error al actualizar estado:", error);

    if (error.response) {
      console.log("📦 Error con respuesta del servidor:");
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
    } else if (error.request) {
      console.log("📡 Solicitud enviada pero sin respuesta:");
      console.log(error.request);
    } else {
      console.log("⚠️ Error general:");
      console.log(error.message);
    }
  }
};


  return (
    <div className="debt-list-container">
      <h2>Solicitudes de Compra de Deuda</h2>
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
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.contractId}</td>
                  <td>{s.beneficiaryName || "-"}</td>
                  <td>{s.beneficiaryRfc || "-"}</td>
                  <td>{s.cartaAutorizacionPath ? "✅" : ""}</td>
                  <td>{s.newContractId || "-"}</td>
                  <td>
                    <span
                      className={`tag-status ${s.status.toLowerCase()}`}
                      onClick={() => cambiarStatus(s.id, s.status)}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="center-text">{s.installmentsToCover ?? "-"}</td>
                  <td className="center-text">{formatoMoneda(s.biweeklyDiscount)}</td>
                  <td className="center-text">{formatoMoneda(s.outstandingBalance)}</td>
                  <td className="center-text">{formatoFecha(s.createdAt)}</td>
                  <td className="center-text">{formatoFecha(s.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DebtPurchaseList;
