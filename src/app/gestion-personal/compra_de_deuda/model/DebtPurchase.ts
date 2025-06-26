export interface DebtPurchase {
  id: number;
  contractId: number;
  installmentsToCover: number;
  biweeklyDiscount: number;
  outstandingBalance: number;
  cartaPagoPath: string;
  cartaAutorizacionPath: string;
  sellingLenderId: number;
  buyingLenderId: number;
  serverClabe: string;
  beneficiaryName: string;
  beneficiaryRfc: string;
  createdBy: string;
  debtOperatorId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  oldContractId: number;
  newContractId: number;
}
