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

export default function LenderSearchPage() {
  const [input, setInput] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { data, loading, error, buscar } = useLenderSearch();

  // Simular carga inicial
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFirstLoad(false);
    }, 800); // puedes ajustar el tiempo de carga inicial

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
        // ⏳ Solo mostrar skeleton inicial
        <BuscarServidorSkeleton />
      ) : (
        // ✅ Mostrar toda la página completa después de la carga inicial
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

            {data && (
              <div className="result-data">
                <LenderHeader data={data} />
                <div className="discounts-section">
                  <DiscountLimitBox limit={data.discountLimit} />
                  <ContractTable data={data} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </PageLayout>

  );
}
