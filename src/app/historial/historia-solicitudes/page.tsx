"use client";

import { PageLayout } from "@/components/PageLayout";
import TablaSolicitudes from "../components/ListaTickets";
import ResumenSolicitudes from "../components/ResumenSolicitudes";
import { CarteraHeader } from "../components/TiketHeader";

export default function TablaSolicitudesPage() {
  return (
    <PageLayout>
      <CarteraHeader />
      <ResumenSolicitudes />
      <TablaSolicitudes />
    </PageLayout>
  );
}
