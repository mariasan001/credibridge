// modal de  extraciond e cartlera 
export interface Contract {
  id: number;
  userId: string;
  nombre: string;
  rfc: string;
  documentation: string;
  contractType: number;
  installments: number;
  discountsAplied: number;
  biweeklyDiscount: number;
  amount: number;
  effectiveRate: number;
  phone: string;
  creditId: string;
  updatedAt: string;
  modificatedUser: string;
  anualRate: number;
  startDate: string;
  endAt: string;
  paymentFrequency: string;
  createdAt: string;
  lastBalance: number;
  newBalance: number;
  status: string;
  discountKey: string;
  lenderServiceId: number;
  contractStatusId: number;
  lenderId: number;
  contractStatusDesc: string;
  nextPaymentDate: string;
  paymentAmount: number;
  typeService: string;
}

export interface ContractsResponse {
  content: Contract[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
