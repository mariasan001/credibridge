"use client"

import { PageLayout } from "@/components/PageLayout"
import { SearchHeader } from "@/components/buscar-servidor/SearchHeader"
import { DownloadButton } from "@/components/botones/DownloadButton"
import { UserInfoCard } from "@/components/buscar-servidor/UserInfoCard"
import { PersonalInfoCard } from "@/components/buscar-servidor/PersonalInfoCard"
import { LaborInfoCard } from "@/components/buscar-servidor/LaborInfoCard"

export default function BuscarServidorPage() {
  return (
    <PageLayout>
      <section className="search-container">

        {/* Título, subtítulo y botón de descarga */}
        <div className="search-header-top">
          <div className="search-header-texts">
            <h2 className="search-header-title">Buscar Servidor Público</h2>
            <p className="search-header-subtitle">
              Ingresa los datos correspondientes para poder obtener la información correspondiente
            </p>
          </div>
          <DownloadButton label="Descargar Archivo" />
        </div>
        <div className="search-cards-row">
          
        </div>
        {/* Cabecera de búsqueda */}
        <SearchHeader />
         {/* Tarjeta del usuario */}
         <UserInfoCard 
          nombre="Juan Perez Ortega" 
          correo="juan@correo.com" 
          descuentosActivos={1} 
          contratosTerminados={1} 
        />

        {/* Info Personal + Laboral */}
        <div className="search-cards-row">
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

          <LaborInfoCard
            unidadAdministrativa="ADRIÁN - DESCRIPCIÓN NO DISPONIBLE"
            puesto="ANALISTA ESPECIALIZADO A 'C'"
            estatus="ACTIVO PERMANENTE 999999"
            noEmpleado="210048332"
            nomina="Gobierno Estado de México"
            institucion="22 – DEPÓSITO BANORTE"
            situacion="Activo"
            fechaIngreso="16/10/2024"
            cuenta="00001295601129" 
          />
        </div>

      </section>
    </PageLayout>
  )
}
