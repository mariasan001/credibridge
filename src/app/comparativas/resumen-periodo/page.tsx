"use client";

import { useState, useEffect } from "react";
import { fetchDashboardContracts } from "./service/dashboard_service";
import { DashboardContract } from "./model/dashboard.model";
import { PageLayout } from "@/components/PageLayout";
import { DashboardContractsTable } from "./components/ContratoItemCard";
import { Pagination } from "@/app/cartera-clientes/components/Pagination";
import { FiltrosDashboard } from "./components/FiltrosDashboard";
import { ResumenHeader } from "./components/CarteraHeader";
import "./dashboard-page.css";
import ResumenSkeleton from "./ResumenSkeleton";

export default function DashboardPage() {
  const [contratos, setContratos] = useState<DashboardContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filtros, setFiltros] = useState({
    startDateFrom: "2025-01-01",
    startDateTo: "2025-12-31",
    contractStatusIds: [1, 2, 3, 4, 5, 6],
    lenderId: 16,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchDashboardContracts(filtros, currentPage - 1, 10);
      setContratos(res.content);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Error al cargar contratos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filtros, currentPage]);

  return (
    <PageLayout>

        {loading ? (
          <ResumenSkeleton />
        ) : (
          <>
            <ResumenHeader />
            <FiltrosDashboard
              onFiltrar={(f) => {
                setCurrentPage(1);
                setFiltros(f);
              }}
            />
            <DashboardContractsTable contratos={contratos} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}

    </PageLayout>
  );
}
