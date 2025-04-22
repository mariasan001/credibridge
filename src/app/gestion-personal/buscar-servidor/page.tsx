'use client'

import { useEffect, useState } from "react"

// Layout general de la página
import { PageLayout } from "@/components/PageLayout"

// Componentes de la sección de búsqueda
import { SearchHeader } from "@/components/buscar-servidor/SearchHeader"
import { DownloadButton } from "@/components/botones/DownloadButton"

// Tarjetas de información
import { UserInfoCard } from "@/components/buscar-servidor/UserInfoCard"
import { PersonalInfoCard } from "@/components/buscar-servidor/PersonalInfoCard"
import { LaborInfoCard } from "@/components/buscar-servidor/LaborInfoCard"

// Sección de contratos y descuentos
import { DiscountBox } from "@/components/buscar-servidor/DiscountBox"
import { ContractTabsSection } from "@/components/buscar-servidor/ContractTable"

// Skeleton personalizado mientras carga
import { BuscarServidorSkeleton } from "@/components/theme/BuscarServidorSkeleton"

export default function BuscarServidorPage() {
  const [loading, setLoading] = useState(true)

  // Simula tiempo de carga
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <PageLayout>
      {loading ? (
        // Skeleton de carga
        <BuscarServidorSkeleton />
      ) : (
        <section className="search-container">
          {/* === Encabezado de la página === */}
          <div className="search-header-top">
            <div className="search-header-texts">
              <h2 className="search-header-title">Buscar Servidor Público</h2>
              <p className="search-header-subtitle">
                Ingresa los datos correspondientes para poder obtener la información correspondiente
              </p>
            </div>
            <DownloadButton label="Descargar Archivo" />
          </div>

          {/* === Buscador con tabs (Número, Nombre, RFC) + input === */}
          <SearchHeader />

          {/* === Tarjetas principales (Usuario + Info personal + Info laboral) === */}
          <div className="search-cards-grid">
            <UserInfoCard 
              nombre="Juan Perez Ortega" 
              correo="juan@correo.com" 
              descuentosActivos={1} 
              contratosTerminados={1} 
            />

            <div className="info-card--personal">
              <PersonalInfoCard
                nombre="Juan Perez Ortega"
                correo="juan@correo.com"
                genero="Masculino"
                fechaNacimiento="24 de Febrero, 1987"
                telefono="7293234764"
                estadoCivil="Soltero (a)"
                curp="TAJH990228HMCILM03"
                rfc="TAJH990228N79"
                madre="Sin Registro"
                padre="Sin Registro"
              />
            </div>

            <div className="info-card--laboral">
              <LaborInfoCard
                unidadAdministrativa="AH00126451 - DESCRIPCION NO DISPONIBLE"
                puesto="ANALISTA ESPECIALIZADA, O 'C' ACTIVA PERMANENTE 99999999"
                estatus="Activo"
                noEmpleado="210048332"
                nomina="Gobierno Estado de México"
                institucion="22 – DEPÓSITO BANORTE"
                situacion="Activo"
                fechaIngreso="16/10/2024"
                cuenta="00001295601129" 
              />
            </div>
          </div>

          {/* === Sección de Descuento + Tabs de Contratos === */}
          <div className="contract-section-row">
            <DiscountBox descuento="$1,543" />
            <ContractTabsSection />
          </div>
        </section>
      )}
    </PageLayout>
  )
}
