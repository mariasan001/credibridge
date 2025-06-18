"use client"

import { useEffect, useState } from "react"
import { PageLayout } from "@/components/PageLayout"
import { Pagination } from "@/app/cartera-clientes/components/Pagination"
import ContractsAdminTable from "./components/ContractsAdminTable"
import ContractsAdminFilters, { FiltersState } from "./components/ContractsAdminFilters"

import { ContractAdmin } from "./model/ticket.model"
import { fetchContractsAdmin } from "./service/ticket_service"
import { CarteraHeader } from "./components/CarteraHeader"


export default function ContractsAdminPage() {
  const [contracts, setContracts] = useState<ContractAdmin[]>([])
  const [filteredContracts, setFilteredContracts] = useState<ContractAdmin[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleFiltersChange = (filters: FiltersState) => {
    const filtrados = contracts.filter(c =>
      (filters.servidor === "" || c.userId.includes(filters.servidor)) &&
      (filters.financiera === "" || c.lenderName === filters.financiera) &&
      (filters.estatus === "" || c.contractStatusDesc === filters.estatus) &&
      (filters.servicio === "" || c.typeService === filters.servicio)
    )
    setFilteredContracts(filtrados)
  }

  useEffect(() => {
    setLoading(true)
    fetchContractsAdmin([1, 2, 3], { page: currentPage - 1, size: 10 })
      .then(data => {
        setContracts(data.content)
        setFilteredContracts(data.content)
        setTotalPages(data.totalPages)
      })
      .catch(error => console.error("Error al cargar contratos:", error))
      .finally(() => setLoading(false))
  }, [currentPage])

  const financieras = [...new Set(contracts.map(c => c.lenderName))]
  const estatuses = [...new Set(contracts.map(c => c.contractStatusDesc))]
  const servicios = [...new Set(contracts.map(c => c.typeService))]

  return (
    <PageLayout>
     <CarteraHeader/>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <ContractsAdminFilters
            onFilterChange={handleFiltersChange}
            financieras={financieras}
            estatuses={estatuses}
            servicios={servicios}
          />

          <ContractsAdminTable contracts={filteredContracts} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </PageLayout>
  )
}
/**
 * se  puede filtrar de todas la s pages y no solo de la pque esta 
 */