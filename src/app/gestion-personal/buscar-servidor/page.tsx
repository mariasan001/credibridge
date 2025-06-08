"use client"

import { useState } from "react"
import { useLenderSearch } from "./hook/useLenderSearch"
import { PageLayout } from "@/components/PageLayout"

import { LenderHeader } from "./components/LenderHeader"
import { DiscountLimitBox } from "./components/DiscountLimitBox"
import { ContractTable } from "./components/ContractTable"

import "./lender-search.css"
import { LenderSearchSkeleton } from "./LenderSearchSkeleton"

export default function LenderSearchPage() {
  const [input, setInput] = useState("")
  const { data, loading, error, buscar } = useLenderSearch()

  const handleSearch = () => {
    if (input.trim()) {
      buscar(input.trim())
    }
  }

  return (
    <PageLayout>
      <div className="lender-search-page">
        <h1>Buscar servidor público</h1>
        <p className="subtitle">
          Consulta los descuentos, contratos y datos laborales del servidor público ingresado.
        </p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Número de servidor público"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>

        <div className="result-container">
         {loading && <LenderSearchSkeleton />}

          {error && <p>{error}</p>}

          {!data && !loading && !error && (
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
    </PageLayout>
  )
}
