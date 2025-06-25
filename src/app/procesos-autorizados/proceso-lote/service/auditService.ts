import { api } from "@/lib/apis";

// Auditoría por usuario
export async function getUserAudit() {
  const response = await api.get("/audit/user");
  return response.data;
}

// Auditoría del catálogo
export async function getCatalogAudit() {
  const response = await api.get("/audit/catalog");
  return response.data;
}
