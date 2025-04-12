"use client"

import { useState } from "react"
import { Search } from "lucide-react" // Ícono moderno de lupa

const searchTypes = [
  { label: "Número", value: "numero" },
  { label: "Nombre", value: "nombre" },
  { label: "RFC", value: "rfc" },
]

export const SearchHeader = () => {
  const [searchType, setSearchType] = useState("numero")
  const [query, setQuery] = useState("")

  return (
    <div className="search-header">
      <div className="search-header__row">
        <div className="search-header__tabs">
          {searchTypes.map((t) => (
            <button
              key={t.value}
              className={`search-header__tab ${searchType === t.value ? "active" : ""}`}
              onClick={() => setSearchType(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="search-header__input-wrapper">
          <Search className="search-header__icon" size={16} />
          <input
            type="text"
            placeholder="Ingresa la información correspondiente"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-header__input"
          />
        </div>
      </div>
    </div>
  )
}
