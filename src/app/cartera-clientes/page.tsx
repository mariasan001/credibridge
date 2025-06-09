"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import "./CarteraClientesPage.css"
import { PageLayout } from "@/components/PageLayout"
import { ContractRow } from "./components/ContractCard"
import { Pagination } from "./components/Pagination"
import { ResumenCards } from "./components/ResumenEstado"
import { CarteraHeader } from "./components/CarteraHeader"
import { fetchClientPortfolio } from "./service/contract_service"
import { ClientPortfolioContract } from "./model/contract_model"

export default function CarteraClientesPage() {
  const { user } = useAuth()

  const [contracts, setContracts] = useState<ClientPortfolioContract[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Filtros
  const [claveSp, setClaveSp] = useState("")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")

  const buscar = () => {
    setLoading(true)

    fetchClientPortfolio(
      claveSp || undefined,
      fechaInicio || undefined,
      fechaFin || undefined,
      {
        page: currentPage - 1,
        size: 7
        // ❌ sort eliminado
      }
    )
      .then(data => {
        setContracts(data.content)
        setTotalPages(data.totalPages)
      })
      .catch(error => {
        console.error("Error al obtener contratos:", error)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    buscar()
  }, [currentPage])

  if (!user?.lender) {
    return <p>No tienes una financiera asociada.</p>
  }

  return (
    <PageLayout>
      <CarteraHeader />
      <ResumenCards />

      {/* Filtros */}
      <div className="filtros-cartera">
        <div className="filtro-grupo">
          <label>Número de servidor público</label>
          <input
            type="text"
            placeholder="Ej. 210045308"
            value={claveSp}
            onChange={(e) => setClaveSp(e.target.value)}
          />
        </div>
        <div className="filtro-grupo">
          <label>Fecha de inicio</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>
        <div className="filtro-grupo">
          <label>Fecha de fin</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>
        <button className="btn-buscar" onClick={() => { setCurrentPage(1); buscar() }}>
          Buscar
        </button>
      </div>

      <div className="cartera-clientes-page">
        {loading ? (
          <p>Cargando contratos...</p>
        ) : contracts.length === 0 ? (
          <p>No hay contratos registrados.</p>
        ) : (
          <>
            <table className="tabla-contratos">
              <thead>
                <tr>
                  <th>Clave</th>
                  <th>Nombre del servidor</th>
                  <th>RFC</th>
                  <th>Saldo Solicitado</th>
                  <th>Descuento</th>
                  <th>Servicio</th>
                  <th>Estatus</th>
                  <th>Fecha</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map(c => (
                  <ContractRow key={c.contractId} contract={c} />
                ))}
              </tbody>
            </table>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </PageLayout>
  )
}
