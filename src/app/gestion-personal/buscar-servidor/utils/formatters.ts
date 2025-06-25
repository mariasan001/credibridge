// utils/formatters.ts
export const formatCurrency = (amount: number | null) =>
  amount?.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2
  }) || "$0.00"

export const formatDate = (dateStr: string | null) =>
  dateStr ? new Date(dateStr).toLocaleDateString("es-MX") : "Sin fecha"
