export interface SolicitudContrato {
  lenderId: number;
  userId: string;
  contractType: number;
  installments: number;
  amount: number;
  biweeklyDiscount: number;
  effectiveRate: number;
  effectiveAnnualRate: number;
  phone: string;
}
