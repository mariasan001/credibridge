// hooks/useDashboard.ts
import useSWR from "swr";
import { getDashboardData } from "../service/dashboard_service";
import { DashboardData } from "../model/dashboard_model";
import { toast } from "react-hot-toast"; // 👈 Importamos el toast

const fetcher = async () => {
  try {
    return await getDashboardData();
  } catch (err) {
    toast.error("No se pudo cargar el panel de control 😕");
    throw err; // para que SWR lo detecte como error
  }
};

export function useDashboard() {
  const { data, error, isLoading, mutate } = useSWR<DashboardData>("dashboard", fetcher);

  return {
    data,
    error,
    loading: isLoading,
    refresh: mutate,
  };
}
