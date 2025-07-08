"use client";
import { useEffect, useState } from "react";
import { ContractsDashboardResponse } from "./model/contractsDashboard.model";
import { getContractsDashboard } from "./service/contractsDashboard.service";
import { PageLayout } from "@/components/PageLayout";

// COMPONENTES
import RankingFinancierasMes from "./components/ui/Card"; // Gráfica de barras de préstamos
import GraficaTotalContratos from "./components/ui/GraficaTotalContratos"; // Línea de contratos por mes
import IndicadorAclaraciones from "./components/ui/IndicadorAclaraciones"; // Avatares con % de quejas
import RankingFinancierasMess from "./components/ui/RankingFinancierasMes"; // Top 3 Financieras

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
        <div style={{ padding: "24px 0" }}>
          {/* 🟢 1. Indicador de aclaraciones */}
          <section style={{ marginBottom: "40px" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "#1f2937" }}>
              Indicador de Aclaraciones
            </h3>
            <IndicadorAclaraciones data={data?.quejasAbiertasPorFinanciera || []} />
          </section>

          {/* 🔵 2. Gráfica de Préstamos por Financiera */}
          <section style={{ marginBottom: "40px" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "#1f2937" }}>
              Préstamos por Financiera
            </h3>
            <RankingFinancierasMes data={data?.prestamosPorFinanciera || []} />
          </section>

          {/* 🟣 3. Contratos por mes (línea) */}
          <section style={{ marginBottom: "40px" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "#1f2937" }}>
              Contratos por Mes
            </h3>
            <GraficaTotalContratos data={data?.contratosPorMes || []} />
          </section>

          {/* 🏆 4. Top 3 Financieras del Mes */}
          <section style={{ marginBottom: "40px" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "#1f2937" }}>
              Top Financieras del Mes
            </h3>
            {data && <RankingFinancierasMess data={data} />}
          </section>
        </div>
      )}
    </PageLayout>
  );
}
/**
 * amm n haber en la page que te pase sin conexio a apis 
 *  venia 
 */