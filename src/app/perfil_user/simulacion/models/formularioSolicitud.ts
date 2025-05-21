//aqui esta el modle de envio de simulacion (request) 
// y la respuesta del ofrmulatio (response)

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
  