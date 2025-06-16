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
import CarteraSkeleton from "./CarteraSkeleton"

export default function CarteraClientesPage() {
  const { user } = useAuth()

  const [contracts, setContracts] = useState<ClientPortfolioContract[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Filtros activos
  const [rfc, setRfc] = useState("")
  const [status, setStatus] = useState("todos")
  const [tiempo, setTiempo] = useState("todos")

  const buscar = () => {
    setLoading(true)

    // 🔄 Calcular fechaInicio y fechaFin según filtro de tiempo
    let fechaInicio: string | undefined = undefined
    let fechaFin: string | undefined = undefined
    const hoy = new Date()

    if (tiempo === "mes") {
      fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1).toISOString().split("T")[0]
      fechaFin = hoy.toISOString().split("T")[0]
    } else if (tiempo === "trimestre") {
      const tresMesesAntes = new Date(hoy)
      tresMesesAntes.setMonth(hoy.getMonth() - 3)
      fechaInicio = tresMesesAntes.toISOString().split("T")[0]
      fechaFin = hoy.toISOString().split("T")[0]
    } else if (tiempo === "año") {
      fechaInicio = new Date(hoy.getFullYear(), 0, 1).toISOString().split("T")[0]
      fechaFin = hoy.toISOString().split("T")[0]
    }

    fetchClientPortfolio(
      rfc || undefined,
      fechaInicio,
      fechaFin,
      { page: currentPage - 1, size: 7 },
      status !== "todos" ? status : undefined
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
  }, [currentPage, rfc, status, tiempo])

  if (!user?.lender) {
    return <p>No tienes una financiera asociada.</p>
  }

  return (
    <PageLayout>
      <CarteraHeader />
      <ResumenCards />

      {/* 🎯 Filtros activos */}
      <div className="filtros-cartera">
        <div className="filtro-grupo">
          <label>RFC</label>
          <input
            type="text"
            placeholder="Ej. COSR6709..."
            value={rfc}
            onChange={(e) => {
              setCurrentPage(1)
              setRfc(e.target.value)
            }}
          />
        </div>

        <div className="filtro-grupo">
          <label>Estatus</label>
          <select
            value={status}
            onChange={(e) => {
              setCurrentPage(1)
              setStatus(e.target.value)
            }}
          >
            <option value="todos">Todos</option>
            <option value="corriente">Corriente</option>
            <option value="adeudo">Adeudo</option>
          </select>
        </div>

        <div className="filtro-grupo">
          <label>Tiempo</label>
          <select
            value={tiempo}
            onChange={(e) => {
              setCurrentPage(1)
              setTiempo(e.target.value)
            }}
          >
            <option value="todos">Todos</option>
            <option value="mes">Este mes</option>
            <option value="trimestre">Trimestre</option>
            <option value="año">Año</option>
          </select>
        </div>
      </div>

      <div className="cartera-clientes-page">
        {loading ? (
          <CarteraSkeleton />
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
