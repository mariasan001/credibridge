
export interface CashPaymentPayload {
  amortizationId: number;
  cashPaymentType: 'OVERPAYMENT_RETURN' | 'SOME_OTHER_TYPE'; // agrega más si hay
  comment: string;
  file: File;
}

