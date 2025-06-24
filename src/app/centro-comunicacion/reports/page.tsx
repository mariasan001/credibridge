"use client";

import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { useAuth } from "@/context/AuthContext";
import { ReportTicketsList } from "./components/ReportTicketsList";
import FormularioBroadcastTicket from "./components/FormularioBroadcastTicket";
import VistaMensajesFijaExtendida from "./components/VistaMensajesFija";
import { ReportTicket } from "./model/reportTicket.model";
import "./reports-page.css";

export default function RankingDashboardPage() {
  const { user } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<ReportTicket | null>(null);

  if (!user) return <PageLayout><p>Cargando...</p></PageLayout>;

  const roles = user.roles || [];
  const isAdmin = roles.some((r) => r.id === 1 || r.id === 2);
  const isFinancieraAdmin = roles.some((r) => r.id === 4);
  const puedeVer = isAdmin || isFinancieraAdmin;

  if (!puedeVer) {
    return <PageLayout><p>No tienes permiso para ver esta sección.</p></PageLayout>;
  }

  return (
    <PageLayout>
      <div className="reportes-layout">
        <div className="reportes-listado">
          <h2>Centro de Quejas</h2>

          <ReportTicketsList
            selectedTicketId={selectedTicket?.id || null}
            onSelectTicket={(ticket) => setSelectedTicket(ticket)}
            showModal={isAdmin}
            onCloseModal={() => setSelectedTicket(null)}
            ticketsRolesAllowed={puedeVer}
          />
        </div>

        <div className="reportes-formulario">
          {isAdmin && <FormularioBroadcastTicket />}

          {isFinancieraAdmin && !isAdmin && (
            selectedTicket
              ? <VistaMensajesFijaExtendida ticket={selectedTicket} />
              : (
                <div className="chat-placeholder">
                  <div className="chat-skeleton">
                    <div className="bubble other"></div>
                    <div className="bubble me"></div>
                    <div className="bubble other short"></div>
                    <div className="bubble me short"></div>
                    <div className="bubble other"></div>
                    <div className="bubble me"></div>
                    <div className="bubble other short"></div>
                    <div className="bubble me short"></div>
                    <div className="bubble other"></div>
                    <div className="bubble me"></div>
                    <div className="bubble other short"></div>
                    <div className="bubble me short"></div>
                  </div>
                  <p className="placeholder-msg">Selecciona un ticket para visualizar la conversación.</p>
                </div>
              )
          )}
        </div>
      </div>
    </PageLayout>
  );
}
