"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ContractModel } from "./model/ContractModel";
import { getContractsByUser } from "./service/movimientosService";
import { PageLayout } from "@/components/PageLayout";
import { ServicioActivoCard } from "./components/MovimientosLista";
import { getPrioridadTipo } from "./utils/getPrioridadTipo";
import { ServicioActivoSkeleton } from "./components/ServicioActivoSkeleton";

export default function MovimientosPage() {
  const { user } = useAuth();
  const [contratos, setContratos] = useState<ContractModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getContractsByUser(user.userId)
      .then(setContratos)
      .finally(() => setLoading(false));
  }, [user]);

  // Filtrar solo los contratos activos
  const contratosActivos = contratos.filter(
    (c) => c.contractStatus?.contractStatusDesc?.toLowerCase() === "activo"
  );
 //ordenamiento por tipo de servcio primero prestmos, seguros y otros .
  const contratosOrdenados = [...contratosActivos].sort((a, b) => {
    const tipoA = a.lenderService?.serviceType?.serviceTypeDesc || "";
    const tipoB = b.lenderService?.serviceType?.serviceTypeDesc || "";
    return getPrioridadTipo(tipoA) - getPrioridadTipo(tipoB);
  });

return (
  <PageLayout>
    <div className="movimientos-container">
      <div className="titulo-mov">
        <h2>Mis servicios activos</h2>
        <br></br>
    
      </div>
      <div className="grid-servicios">
        {loading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <ServicioActivoSkeleton key={i} />
            ))}
          </>
        ) : contratosOrdenados.length === 0 ? (
          <p>No tienes servicios activos.</p>
        ) : (
          contratosOrdenados.map((contrato) => (
            <ServicioActivoCard key={contrato.contractId} contrato={contrato} />
          ))
        )}
      </div>
    </div>
  </PageLayout>
);
}