"use client";

import { useEffect, useState } from "react";
import { fetchTickets } from "../service/ticket_service";
import { Ticket } from "../model/ticket_model";
import { PageLayout } from "@/components/PageLayout";
import TablaSolicitudes from "../components/ListaTickets";
import ResumenSolicitudes from "../components/ResumenSolicitudes";
import { CarteraHeader } from "../components/TiketHeader";

export default function TablaSolicitudesPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    fetchTickets().then((data) => {
      // Filtramos solo las solicitudes
      const solicitudes = data.filter(
        (ticket) => ticket.ticketType === "SOLICITUD"
      );
      setTickets(solicitudes);
    });
  }, []);

  return (
    <PageLayout>
      <CarteraHeader />
      <ResumenSolicitudes />
      <TablaSolicitudes />
      
    </PageLayout>
  );
}
