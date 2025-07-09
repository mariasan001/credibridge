"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useLenderSearch } from "./hook/useLenderSearch";
import { PageLayout } from "@/components/PageLayout";

import { LenderHeader } from "./components/LenderHeader";
import { DiscountLimitBox } from "./components/DiscountLimitBox";
import { ContractTable } from "./components/ContractTable";

import { LenderSearchSkeleton } from "./LenderSearchSkeleton";
import BuscarServidorSkeleton from "./BuscarServidorSkeleton";


import toast from "react-hot-toast"; // ✅ Manejo de errores

import "./lender-search.css";
import { useAuth } from "@/hooks/useAuth";
let lenderSearchLoadedOnce = false; // 🌱 Persiste en la sesión del navegador


export default function LenderSearchPage() {
  const [input, setInput] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(!lenderSearchLoadedOnce);
  const { data, loading, error, buscar } = useLenderSearch();
  const { user } = useAuth();

  useEffect(() => {
    if (!lenderSearchLoadedOnce) {
      const timeout = setTimeout(() => {
        lenderSearchLoadedOnce = true;
        setIsFirstLoad(false);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, []);

  // Mostrar error con toast
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Buscar servidor público
  const handleSearch = useCallback(() => {
    if (input.trim()) {
      buscar(input.trim());
      setHasSearched(true);
    }
  }, [input, buscar]);

  // Resultado memoizado
  const resultadoMemo = useMemo(() => {
    if (!data || !user) return null;
    return (
      <div className="result-data">
        <LenderHeader data={data} />
        <div className="discounts-section">
          <DiscountLimitBox limit={data.discountLimit} />
          <ContractTable data={data} usuarioActual={user} />
        </div>
      </div>
    );
  }, [data, user]);

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
            <button
              onClick={handleSearch}
              disabled={loading || !input.trim()}
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>

          <div className="result-container">
            {hasSearched && loading && <LenderSearchSkeleton />}

            {!hasSearched && (
              <div className="empty-state-bonita">
                <img
                  src="/img/img_buscar_servidor.png"
                  alt="Buscar servidor público"
                  className="empty-illustration"
                />
                <h2>Busca a un servidor público</h2>
                <p>Ingresa el número de servidor público para comenzar.</p>
                <p className="motivador">“Todo gran historial empieza con una búsqueda. ¿Listo para comenzar?”</p>
              </div>
            )}

            {resultadoMemo}
          </div>
        </div>
      )}
    </PageLayout>
  );
}

