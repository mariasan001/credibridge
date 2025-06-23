export interface ResumenDashboard {
  totalIncidencias: number;
  activas: number;
  expiradas: number;
  atendidas: number;
}

export interface RankingMensual {
  mes: string;
  atendidas: number;
  expiradas: number;
  activas:number;
}

export interface IncidenciasPorInstitucion {
  institucion: string;
  incidencias7d: number;
}

export interface TiempoRespuesta {
  solicitudes: number;
  quejas: number;
  expiradas: number;
  activas: number;
  total: number;
  tiempoRespuesat: number;
  idFinanciera: number;
  financiera: string;
}

export interface RankingDashboardData {
  resumen: ResumenDashboard;
  rankingMensual: RankingMensual[];
  incidenciasPorInstitucion: IncidenciasPorInstitucion[];
  tiemposDeRespuesta: TiempoRespuesta[];
}
