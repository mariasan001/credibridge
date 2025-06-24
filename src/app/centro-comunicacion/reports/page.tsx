"use client";

import { PageLayout } from "@/components/PageLayout";
import FormularioBroadcastTicket from "./components/FormularioBroadcastTicket";
import { ReportTicketsList } from "./components/ReportTicketsList";
import "./reports-page.css";

export default function RankingDashboardPage() {
  return (
    <PageLayout>
      <div className="reportes-layout">
        <div className="reportes-listado">
          <h2>Historial </h2>
          <ReportTicketsList /> {/* Ya se encarga de cargar y mostrar los datos */}
        </div>

        <div className="reportes-formulario">
          <FormularioBroadcastTicket />
        </div>
      </div>
    </PageLayout>
  );
}
