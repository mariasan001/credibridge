export interface ContractClosedPerMonth {
  month: string          // formato: YYYY-MM
  contractCount: number
}

export interface DashboardData {
  totalLiberado: number      // puede venir con decimales, tipo number está bien
  totalAsignado: number
  totalRestante: number
  totalContratos: number
  totalQuejas: number
  totalAclaraciones: number
  contratosCerradosPorMes: ContractClosedPerMonth[]
}
