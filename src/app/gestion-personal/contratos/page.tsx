"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { PageLayout } from "@/components/PageLayout";
import { Pagination } from "@/app/cartera-clientes/components/Pagination";
import ContractsAdminTable from "./components/ContractsAdminTable";
import ContractsAdminFilters, { FiltersState } from "./components/ContractsAdminFilters";
import { ContractAdmin } from "./model/ticket.model";
import { fetchContractsAdmin } from "./service/ticket_service";
import { CarteraHeader } from "./components/CarteraHeader";
import ContractsAdminTableSkeleton from "./components/ContractsAdminTableSkeleton";

export default function ContractsAdminPage() {
  const [allContracts, setAllContracts] = useState<ContractAdmin[]>([]);
  const [filteredContracts, setFilteredContracts] = useState<ContractAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [contractsPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    fetchContractsAdmin([1, 2, 3], { page: 0, size: 9999 })
      .then((data) => {
        setAllContracts(data.content);
        setFilteredContracts(data.content);
      })
      .catch((error) => {
        console.error("Error al cargar contratos:", error);
        toast.error("Ocurrió un error al cargar los contratos");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFiltersChange = (filters: FiltersState) => {
    const filtrados = allContracts.filter((c) =>
      (filters.servidor === "" || c.userId.includes(filters.servidor)) &&
      (filters.financiera === "" || c.lenderName === filters.financiera) &&
      (filters.estatus === "" || c.contractStatusDesc === filters.estatus) &&
      (filters.servicio === "" || c.typeService === filters.servicio)
    );
    setFilteredContracts(filtrados);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Opciones únicas para los filtros
  const financieras = [...new Set(allContracts.map((c) => c.lenderName))];
  const estatuses = [...new Set(allContracts.map((c) => c.contractStatusDesc))];
  const servicios = [...new Set(allContracts.map((c) => c.typeService))];

  // Contratos de la página actual
  const totalPages = Math.ceil(filteredContracts.length / contractsPerPage);
  const currentContracts = filteredContracts.slice(
    (currentPage - 1) * contractsPerPage,
    currentPage * contractsPerPage
  );

  return (
    <PageLayout>
      <CarteraHeader />

      {loading ? (
        <ContractsAdminTableSkeleton />
      ) : (
        <>
          <ContractsAdminFilters
            onFilterChange={handleFiltersChange}
            financieras={financieras}
            estatuses={estatuses}
            servicios={servicios}
          />

          <ContractsAdminTable contracts={currentContracts} />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </PageLayout>
  );
}
