export interface PrestamosPorFinanciera {
  financiera: string;
  cantidadPrestamo: number;
}

export interface ContratosPorMes {
  mes: string;
  estatus: string;
  total: number;
}

export interface QuejasAbiertasPorFinanciera {
  financiera: string;
  quejasAbiertas: number;
}

export interface ContractsDashboardResponse {
  prestamosPorFinanciera: PrestamosPorFinanciera[];
  contratosPorMes: ContratosPorMes[];
  quejasAbiertasPorFinanciera: QuejasAbiertasPorFinanciera[];
}
