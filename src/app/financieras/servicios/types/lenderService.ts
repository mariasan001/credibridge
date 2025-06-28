export interface LenderService {
  id: number;
  lenderServiceDesc: string;
  lenderId: number;
  rate: number;
  serviceTypeId: number;
  minValue: number;
  maxValue: number;
  frequency: number;
  minimumDiscountAmountForInclusion: number;
  minimumAmountPerContract: number;
  minimumTotalAmount: number;
  active: boolean;
  maximumTerm: number;
  keyId: number;
}
