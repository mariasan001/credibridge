import { api } from "@/lib/apis"

interface DebtPurchaseData {
  createdBy: string
  debtOperatorId: string
  sellingLenderId: number
}

export async function uploadDebtPurchase(data: DebtPurchaseData, file: File) {
  const formData = new FormData()
  formData.append("data", JSON.stringify(data))
  formData.append("file", file)

  const response = await api.post("/api/debt-purchase/debt-purchase", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data
}
