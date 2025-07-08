"use client";
import { useEffect, useState } from "react";
import { ContractsDashboardResponse } from "./model/contractsDashboard.model";
import { getContractsDashboard } from "./service/contractsDashboard.service";
import { PageLayout } from "@/components/PageLayout";

// COMPONENTES
import RankingFinancierasMes from "./components/ui/Card";
import GraficaTotalContratos from "./components/ui/GraficaTotalContratos";
import IndicadorAclaraciones from "./components/ui/IndicadorAclaraciones";
import RankingFinancierasMess from "./components/ui/RankingFinancierasMes";

import "./InicioNomina.css";

export default function DashboardRankingPage() {
  const [data, setData] = useState<ContractsDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContractsDashboard()
      .then((res) => setData(res))
      .catch((err) => console.error("Error al obtener dashboard:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageLayout>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className=".dashboard-container01">
          {/* 🟢 Fila 1: Top 3 + Contratos */}
          <div className="row">
            <section className="col col-40">
              {data && <RankingFinancierasMess data={data} />}
            </section>

            <section className="col col-60">
             
              <GraficaTotalContratos data={data?.contratosPorMes || []} />
            </section>
          </div>

          {/* 🟠 Fila 2: Aclaraciones + otra gráfica */}
          <div className="row">
            <section className="col col-30">
            
              <IndicadorAclaraciones data={data?.quejasAbiertasPorFinanciera || []} />
            </section>

            <section className="col col-70">
           

              <RankingFinancierasMes data={data?.prestamosPorFinanciera || []} />

            </section>
          </div>
        </div>
      )}
    </PageLayout>
  );
}

/**
 * mira ve todo apachurraso hacia un lado  denr de tener una dsipercion en so ompoentes 
 * 
 */