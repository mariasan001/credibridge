"use client";

import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";


import "./portal-comunicacion.css";
import { ReportTicket } from "../reports/model/reportTicket.model";
import { ReportTicketsList } from "../reports/components/ReportTicketsList";
import FormularioBroadcastTicket from "../reports/components/FormularioBroadcastTicket";
import { useAuth } from "@/hooks/useAuth";

export default function ReportesFinancierosPage() {
  const { user } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<ReportTicket | null>(null);

  if (!user) return <PageLayout><p>Cargando...</p></PageLayout>;

  const roles = user.roles || [];
  const esAdminGeneral = roles.some((r) => r.id === 1 || r.id === 2);
  const esAdminFinanciera = roles.some((r) => r.id === 4);
  const puedeAcceder = esAdminGeneral || esAdminFinanciera;

  if (!puedeAcceder) {
    return <PageLayout><p>No tienes permiso para ver esta sección.</p></PageLayout>;
  }

  return (
    <PageLayout>
      <div className="reportes-layout">
        <div className="reportes-listado">
          <h3>Centro de Comunicacion</h3>
          <ReportTicketsList
            selectedTicketId={selectedTicket?.id || null}
            onSelectTicket={setSelectedTicket}
            showModal={true}
            onCloseModal={() => setSelectedTicket(null)}
            ticketsRolesAllowed={true}
            ticketFilter={(ticket) => ticket.ticket.ticketType === "COMUNICACION"} 
          />

        </div>

        <div className="reportes-formulario">
          {/* Mostrar el formulario a todos los roles permitidos */}
          {puedeAcceder && (
            <FormularioBroadcastTicket modoComunicacion={true} />
          )}

          {/* Mostrar mensajes o placeholder */}

        </div>
      </div>
    </PageLayout>
  );
}
