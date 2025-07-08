// app/dashboard/model/dashboardts.model.

export interface DashboardContract {
  contractId: number;
  installments: number;
  discountsAplied: number;
  biweeklyDiscount: number;
  amount: number;
  creditId: string;
  startDate: string;
  newBalance: number;
  paymentFrequency: string;
  status: string;
  discountKey: string;
  contractStatus: {
    id: number;
    contractStatusDesc: string;
  };
  user: {
    userId: string;
    name: string;
    rfc: string;
    curp: string;
    idPlaza: string;
    idSs: string;
  };
  lenderService: {
    id: number;
    lenderServiceDesc: string;
    serviceType: {
      id: number;
      serviceTypeDesc: string;
    };
    key: {
      id: string;
      descKey: string;
    };
  };
}
