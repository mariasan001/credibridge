export interface ContractModel {
  contractId: number;
  installments: number;
  discountsAplied: number;
  biweeklyDiscount: number;
  amount: number;
  effectiveRate: number;
  anualRate: number;
  lastBalance: number;
  newBalance: number;
  lenderService: {
    id: number;
    lenderServiceDesc: string;
    serviceType: {
      id: number;
      serviceTypeDesc: string;
    };
  };
  contractStatus: {
    id: number;
    contractStatusDesc: string;
  };
  lender: {
    id: number;
    lenderName: string;
    lenderDesc: string;
    lenderEmail: string;
    lenderPhone: string;
    photo: string;
    active: boolean;
  };
  lastPayment: {
    date: string;
    amount: number;
  };
  nextPayment: {
    date: string;
    amount: number;
  };
}