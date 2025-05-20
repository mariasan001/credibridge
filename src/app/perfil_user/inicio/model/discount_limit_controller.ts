// MODELO para request
export interface SimulationRequest {
    userId: string;
    simTypeId: number;
    periods: number;
    paymentAmount: number;
  }
  
  // MODELO para response
  export interface SimulationResult {
    lenderServiceId: number;
    lenderId: number;
    lenderName: string;
    serviceTypeId: number;
    serviceTypeDesc: string;
    capital: number;
    effectivePeriodRate: number;
    effectiveAnnualRate: number;
  }
  