"use client"

import { useEffect, useState } from "react"
import ContractsAdminTable from "./components/ContractsAdminTable"
import { PageLayout } from "@/components/PageLayout"
import { ContractAdmin } from "./model/ticket.model"
import { fetchContractsAdmin } from "./service/ticket_service"
import { Pagination } from "@/app/cartera-clientes/components/Pagination"


export default function ContractsAdminPage() {
  const [contracts, setContracts] = useState<ContractAdmin[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    setLoading(true)
    fetchContractsAdmin([1, 2, 3], { page: currentPage - 1, size: 10 })
      .then(data => {
        setContracts(data.content)
        setTotalPages(data.totalPages)
      })
      .catch(error => console.error("Error al cargar contratos:", error))
      .finally(() => setLoading(false))
  }, [currentPage])

  return (
    <PageLayout>
      <h2>Contratos Administrador</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <ContractsAdminTable contracts={contracts} />
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
