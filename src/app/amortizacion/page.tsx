"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import "./Contratos.css";
import { AmortizationResponse } from "./model/amortization_model";
import { getAmortizationDetail } from "./service/getAmortizationDetail";
import { AmortizationSkeleton } from "./AmortizationSkeleton";
import { PageLayout } from "@/components/PageLayout";
import { HeaderContrato } from "./components/HeaderContrato";
import ResumenContrato from "./components/ResumenContrato";
import DetalleContrato from "./components/DetalleContrato";
import TablaAmortizacion from "./components/TablaAmortizacion";
import TablaDescuentosRecuperados from "./components/TablaDescuentosRecuperados";

export default function AmortizationPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();

  const [data, setData] = useState<AmortizationResponse | null>(null);

useEffect(() => {
  const id = localStorage.getItem("selectedContractId");

  if (!id) {
    console.warn("No se encontró ningún contrato seleccionado.");
    return;
  }

  getAmortizationDetail(parseInt(id))
    .then(setData)
    .catch((err) => console.error("Error al obtener amortización:", err));
}, []);


  if (!data) return <AmortizationSkeleton />;

  const { contract, actualPayments, simulatedSchedule } = data;

  return (
    <PageLayout>
      <div className="amortizacion-page">
        <HeaderContrato />

        <ResumenContrato
          installments={contract.installments}
          discountsAplied={contract.discountsAplied}
          amount={contract.amount}
          newBalance={contract.newBalance}
          estatus={contract.status}
        />

        <div className="amortizacion-body">
          <DetalleContrato contrato={contract} />

          <div className="amortizacion-tablas">
            <TablaAmortizacion
              pagos={simulatedSchedule}
              cuota={contract.biweeklyDiscount}
              totalCuotas={contract.installments}
              frecuenciaPago={contract.paymentFrequency}
              tasaIVA={0.16}
              tasaAnual={contract.anualRate ?? 0}
            />
            <TablaDescuentosRecuperados descuentos={actualPayments} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
