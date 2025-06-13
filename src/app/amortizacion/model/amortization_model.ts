export interface AmortizationResponse {
  contract: ContractDetail;
  actualPayments: ActualPayment[];
  simulatedSchedule: SimulatedPayment[];
}

export interface ContractDetail {
  contractId: number;
  documentation: string;
  contractType: number;
  installments: number;
  discountsAplied: number;
  biweeklyDiscount: number;
  amount: number;
  effectiveRate: number;
  phone: string;
  creditId: string;
  startDate: string;
  endAt: string;
  createdAt: string;
  paymentFrequency: string;
  anualRate: number;
  lastBalance: number;
  newBalance: number;
  status: string;
  discountKey: string;

  user: ContractUser;
  lender: Lender;
  lenderService: LenderService;
  contractStatus: {
    id: number;
    contractStatusDesc: string;
  };
}

export interface ContractUser {
  userId: string;
  name: string;
  email: string;
  rfc: string;
  curp: string;
  phone: string;
  dateOfBirth: string;
  occupationDate: string;
  address: string;
  idPlaza: string;
  idSs: string;

  workUnit: GenericIdDesc;
  bank: GenericIdDesc;
  jobCode: GenericIdDesc;
  positionStatus: GenericIdDesc;
  addressType: GenericIdDesc;
  country: GenericIdDesc;
  state: GenericIdDesc;
  gender: GenericIdDesc;
  maritalStatus: GenericIdDesc;
  userStatus: GenericIdDesc;

  roles: {
    id: number;
    description: string;
  }[];

  street: string;
  addressNumber: string;
  addressDistrict: string;
  addressCity: string;
  lender: Lender;
}

export interface Lender {
  id: number;
  lenderName: string;
  lenderDesc: string;
  lenderEmail: string;
  lenderPhone: string;
  photo: string;
  active: boolean;
}

export interface LenderService {
  id: number;
  lenderServiceDesc: string;
  lender: Lender;
  rate: number;
  serviceType: {
    id: number;
    serviceTypeDesc: string;
  };
  minValue: number;
  maxValue: number;
  frequency: number;
  minimumDiscountAmountForInclusion: number;
  minimumAmountPerContract: number;
  minimumTotalAmount: number;
  maximumTerm: number;
  active: boolean;
  key: {
    id: string;
    descKey: string;
  };
}

export interface ActualPayment {
  id: number;
  creditId: number;
  createdAt: string;
  user: string;
  period: string;
  anio: string;
  beginningBalance: number;
  endingBalance: number;
  paymentAmount: number;
  interestAmount: number;
  paymentStatus: number;
  paymentType: number;
  reshipmentDate: string;
  negppa: string;
}

export interface SimulatedPayment {
  installmentNumber: number;
  paymentDate: string;
  outstandingBalance: number;
  amortization: number;
  interest: number;
  iva: number;
  total: number;
}

export interface GenericIdDesc {
  id: number | string;
  desc: string;
}
