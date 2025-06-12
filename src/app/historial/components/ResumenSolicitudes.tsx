"use client";

import { useEffect, useState } from "react";
import { fetchTickets } from "../service/ticket_service";
import { Ticket } from "../model/ticket_model";
import "./ResumenSolicitudes.css";

export default function ResumenSolicitudes() {
  const [stats, setStats] = useState({
    total: 0,
    sinAsignar: 0,
    porVencer: 0,
    vencidas: 0,
    activas: 0
  });

  useEffect(() => {
    fetchTickets().then(data => {
      const solicitudes: Ticket[] = data.filter(t => t.ticketType === "SOLICITUD");

      const hoy = new Date();
      const calcularDiasRestantes = (fechaStr: string) => {
        const fechaCreacion = new Date(fechaStr);
        return Math.floor((fechaCreacion.getTime() + 16 * 86400000 - hoy.getTime()) / 86400000);
      };

      const resumen = {
        total: solicitudes.length,
        sinAsignar: solicitudes.filter(t => !t.assignedTo).length,
        porVencer: solicitudes.filter(t => {
          const dias = calcularDiasRestantes(t.creationDate);
          return dias >= 0 && dias <= 1;
        }).length,
        vencidas: solicitudes.filter(t => calcularDiasRestantes(t.creationDate) < 0).length,
        activas: solicitudes.filter(t => calcularDiasRestantes(t.creationDate) > 1).length,
      };

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
        <span>Activas</span>
        <strong>{stats.activas}</strong>
      </div>
      <div className="card yellow">
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
