import { api } from "@/lib/apis"
import { ContractAdmin } from "../model/ticket.model"
import { mapToContractAdmin } from "../utils/mapContractAdmin"


interface Pageable {
  page: number
  size: number
}

interface ContractAdminResponse {
  content: ContractAdmin[]
  totalPages: number
  totalElements: number
}

export async function fetchContractsAdmin(
  statusIds: number[],
  pageable: Pageable
): Promise<ContractAdminResponse> {
  const params = new URLSearchParams()
  statusIds.forEach(id => params.append("statusIds", id.toString()))
  params.append("page", pageable.page.toString())
  params.append("size", pageable.size.toString())

  const response = await api.get(`/api/contracts/admin/all?${params.toString()}`)

  return {
    content: response.data.content.map(mapToContractAdmin),
    totalPages: response.data.totalPages,
    totalElements: response.data.totalElements,
  }
}
