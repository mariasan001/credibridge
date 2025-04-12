// components/buscar-servidor/ContractTabs.tsx
"use client"

import { useState } from "react"

interface ContractTabsProps {
  activeTab?: string
  onChange: (tab: string) => void
}

export const ContractTabs = ({ activeTab = "Contratos Terminados", onChange }: ContractTabsProps) => {
  const tabs = ["Contratos Terminados", "Descuento Activos", "Negociaciones"]

  return (
    <div className="contract-tabs">
      {tabs.map((tab) => (
        <button  
          key={tab}
          className={`contract-tab__button ${tab === activeTab ? "active" : ""}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
      <button className="contract-tab__download">Descargar</button>
    </div>
  )
}
