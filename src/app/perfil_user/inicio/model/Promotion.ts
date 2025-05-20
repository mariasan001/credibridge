export interface Promotion {
    id: number;
    maxValue: number;
    frequency: number;
    minimumDiscountAmountForInclusion: number;
    minimumAmountPerContract: number;
    minimumTotalAmount: number;
    active: boolean;
    maximumTerm: number;
    key: {
      id: string;
      descKey: string;
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
    benefits: {
      id: number;
      benefitsDesc: string;
    }[];
  }
  