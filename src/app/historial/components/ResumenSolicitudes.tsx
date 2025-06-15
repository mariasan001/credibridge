"use client";

import { useEffect, useState } from "react";
import { Ticket } from "../model/ticket_model";
import { fetchTicketsByStatus } from "../service/ticket_service";
import "./ResumenSolicitudes.css";

export default function ResumenSolicitudes() {
  const [stats, setStats] = useState({
    total: 0,
    resueltos: 0,
    porVencer: 0,
    vencidas: 0,
    enProceso: 0,
    sinAsignar: 0,
  });

  useEffect(() => {
    fetchTicketsByStatus([1, 2, 3], 0, 100).then(data => {
      const solicitudes: Ticket[] = data.content.filter(t => t.ticketType === "SOLICITUD");
      const hoy = new Date();

      const calcularDiasRestantes = (fechaStr: string) => {
        const fechaCreacion = new Date(fechaStr);
        return Math.floor((fechaCreacion.getTime() + 16 * 86400000 - hoy.getTime()) / 86400000);
      };

      const resumen = {
        total: solicitudes.length,
        resueltos: 0,
        porVencer: 0,
        vencidas: 0,
        enProceso: 0,
        sinAsignar: 0,
      };

      solicitudes.forEach(t => {
        const dias = calcularDiasRestantes(t.creationDate);
        if (dias >= 0 && dias <= 1) resumen.porVencer++;
        if (dias < 0) resumen.vencidas++;

        const status = t.status.toLowerCase();
        if (status === "resuelto") resumen.resueltos++;
        if (status === "en proceso") resumen.enProceso++;
        if (!t.assignedTo) resumen.sinAsignar++;
      });

      setStats(resumen);
    });
  }, []);

  return (
    <div className="resumen-cards">
      <div className="card neutral">
        <span>Total de solicitudes</span>
        <strong>{stats.total}</strong>
      </div>
      <div className="card neutral">
        <span>En proceso</span>
        <strong>{stats.enProceso}</strong>
      </div>
      <div className="card neutral">
        <span>Resueltas</span>
        <strong>{stats.resueltos}</strong>
      </div>
      <div className="card neutral">
        <span>Por vencer</span>
        <strong>{stats.porVencer}</strong>
      </div>
      <div className="card red">
        <span>Vencidas</span>
        <strong>{stats.vencidas}</strong>
      </div>
      <div className="card black">
        <span>Sin asignar</span>
        <strong>{stats.sinAsignar}</strong>
      </div>
    </div>
  );
}
