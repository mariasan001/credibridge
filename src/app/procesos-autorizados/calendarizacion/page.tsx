"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { getPeriods } from "./service/periodService";
import { Period } from "./models/types/period";
import { PeriodForm } from "./components/PeriodForm";
import { PeriodList } from "./components/PeriodList";
import { CarteraHeader } from "./components/CarteraHeader";
import "./periodos.css";

export default function PeriodosPage() {
  const [periods, setPeriods] = useState<Period[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPeriods = async () => {
    try {
      const data = await getPeriods();
      setPeriods(data);
    } catch (err) {
      setError("❌ Error al obtener los periodos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeriods();
  }, []);

  return (
    <PageLayout>
      <CarteraHeader />
      <div className="periodos-contenedor">
        {/* Formulario para crear nuevo periodo */}
        <div className="formulario">
          <PeriodForm onPeriodCreated={fetchPeriods} />
        </div>

        {/* Listado de periodos creados */}
        <div className="lista">
          <PeriodList periods={periods} loading={loading}  />
        </div>
      </div>
    </PageLayout>
  );
}
