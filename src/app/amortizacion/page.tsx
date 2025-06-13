"use client";

import { useEffect, useState } from "react";
import { AmortizationResponse } from "./model/amortization_model";
import { getAmortizationDetail } from "./service/getAmortizationDetail";

// Layout general
import { PageLayout } from "@/components/PageLayout";

// Componentes específicos
import { HeaderContrato } from "./components/HeaderContrato";
import ResumenContrato from "./components/ResumenContrato";
import DetalleContrato from "./components/DetalleContrato";
import TablaAmortizacion from "./components/TablaAmortizacion";
import TablaDescuentosRecuperados from "./components/TablaDescuentosRecuperados";
import "./Contratos.css";

export default function AmortizationPage() {
  const [data, setData] = useState<AmortizationResponse | null>(null);
  const [statusLocal, setStatusLocal] = useState<string>("N/A");

  useEffect(() => {
    const id = localStorage.getItem("selectedContractId");
    const status = localStorage.getItem("selectedContractStatus");

    if (status) setStatusLocal(status); // ← estatus correcto

    if (id) {
      getAmortizationDetail(parseInt(id)).then(setData);
    }
  }, []);

  if (!data) return <p>Cargando datos...</p>;

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
          estatus={statusLocal} // ← usamos el estatus de localStorage
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
