// hooks/useDashboard.ts
import useSWR from "swr";
import { getDashboardData } from "../service/dashboard_service";
import { DashboardData } from "../model/dashboard_model";

const fetcher = () => getDashboardData();

export function useDashboard() {
  const { data, error, isLoading, mutate } = useSWR<DashboardData>("dashboard", fetcher);

  return {
    data,
    error: error ? "Error al cargar el dashboard" : "",
    loading: isLoading,
    refresh: mutate, // 👉 útil si quieres un botón para actualizar manualmente
  };
}
