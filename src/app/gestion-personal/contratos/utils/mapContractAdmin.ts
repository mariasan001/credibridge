import { ContractAdmin } from "../model/ticket.model";


export function mapToContractAdmin(raw: any): ContractAdmin {
  return {
    contractId: raw.contractId,
    userId: raw.user?.userId ?? "SIN ID",
    nombre: raw.user?.name ?? "SIN NOMBRE",
    contractStatusDesc: raw.contractStatus?.contractStatusDesc ?? "SIN ESTATUS",
    typeService: raw.lenderService?.serviceType?.serviceTypeDesc ?? "SIN SERVICIO",
    installments: raw.installments,
    biweeklyDiscount: raw.biweeklyDiscount,
    amount: raw.amount,
    lenderName: raw.lender?.lenderName ?? "SIN FINANCIERA"
  }
}
