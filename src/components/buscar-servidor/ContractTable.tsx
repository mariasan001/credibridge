'use client'

import { useState } from "react"
import { DownloadButton } from "../botones/DownloadButton"
import { ContractTable } from "./ContractTabs" // Tabla de contratos

// Tipos de pestañas disponibles
type TabType = "Contratos Terminados" | "Descuento Activos" | "Negociaciones"

// Arreglo de tabs para renderizado dinámico
const tabs: TabType[] = [
  "Contratos Terminados",
  "Descuento Activos",
  "Negociaciones"
]

// Componente principal de la sección con tabs
export const ContractTabsSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Contratos Terminados")

  // Datos por cada tab, con íconos personalizados
  const contractsData: Record<TabType, {
    servicio: string
    institucion: string
    contrato: string
    codigoInstitucion: string
    fecha: string
    icon: string
  }[]> = {
    "Contratos Terminados": [
      {
        servicio: "Préstamo",
        institucion: "BANCO MULTIVA SA INSTITUCION DE BANCA MULTIPLE",
        contrato: "2175172",
        codigoInstitucion: "0051535604",
        fecha: "24/04/2024",
        icon: "🟣"
      },
      {
        servicio: "Préstamo",
        institucion: "ASF SERVICIOS FINANCIEROS SAPI DE CV SOFOM ENR",
        contrato: "2153353",
        codigoInstitucion: "64309",
        fecha: "01/12/2023",
        icon: "🔵"
      }
    ],
    "Descuento Activos": [],
    "Negociaciones": []
  }

  return (
    <section className="contract-tabs-section">
      {/* === Navegación por pestañas === */}
      <div className="contract-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`contract-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}

        {/* Botón de descarga */}
        <div className="contract-download-btn">
          <DownloadButton label="Descargar" />
        </div>
      </div>

      {/* === Tabla de contratos de la pestaña activa === */}
      <ContractTable data={contractsData[activeTab]} />
    </section>
  )
}
