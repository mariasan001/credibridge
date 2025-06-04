"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { SimuladorCreditoForm } from "./components/formularioSolicitud";
import "./syles.css";
import { SimuladorCreditoSkeleton } from "./page_skeleton";

export default function SimulacionPage() {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga real de 1.5s
    const timeout = setTimeout(() => {
      setCargando(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <PageLayout>
      <div className="simulacion-container">
        <div className="simulacion-header">
          <h2 className="title">Simulador de crédito</h2>
          <p>
            Aquí podrás simular tu crédito y, si te conviene, podrás solicitarlo con la
            financiera de tu preferencia.
          </p>
        </div>

        <div className="simulacion-form-wrapper">
          {cargando ? <SimuladorCreditoSkeleton /> : <SimuladorCreditoForm />}
        </div>
      </div>
    </PageLayout>
  );
}
