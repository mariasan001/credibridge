"use client";

import { useEffect, useState } from "react";
import { useLenderSearch } from "./hook/useLenderSearch";
import { PageLayout } from "@/components/PageLayout";

import { LenderHeader } from "./components/LenderHeader";
import { DiscountLimitBox } from "./components/DiscountLimitBox";
import { ContractTable } from "./components/ContractTable";
import { LenderSearchSkeleton } from "./LenderSearchSkeleton";

import "./lender-search.css";
import BuscarServidorSkeleton from "./BuscarServidorSkeleton";
import { useAuth } from "@/context/AuthContext"; // ✅ Asegúrate de tener este hook importado

export default function LenderSearchPage() {
  const [input, setInput] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { data, loading, error, buscar } = useLenderSearch();
  const { user } = useAuth(); // ✅ Obtener usuario actual del contexto

  // Simular carga inicial
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFirstLoad(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  const handleSearch = () => {
    if (input.trim()) {
      buscar(input.trim());
      setHasSearched(true);
    }
  };

  return (
    <PageLayout>
      {isFirstLoad ? (
        <BuscarServidorSkeleton />
      ) : (
        <div className="lender-search-page">
          <h3>Buscar servidor público</h3>
          <p className="subtitle">
            Consulta los descuentos, contratos y datos laborales del servidor público ingresado.
          </p>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Número de servidor público"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>Buscar</button>
          </div>

          <div className="result-container">
            {hasSearched && loading && <LenderSearchSkeleton />}
            {hasSearched && error && <p>{error}</p>}
            {!hasSearched && (
              <div className="empty-state">
                <p>🔍 No hay resultados. Realiza una búsqueda para comenzar.</p>
              </div>
            )}

            {data && user && (
              <div className="result-data">
                <LenderHeader data={data} />
                <div className="discounts-section">
                  <DiscountLimitBox limit={data.discountLimit} />
                  <ContractTable data={data} usuarioActual={user} /> {/* ✅ AQUÍ */}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  );
}
