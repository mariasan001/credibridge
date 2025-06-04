export interface Promotion {
  id: number;
  promotionTitle: string;
  promotionDesc: string;
  startDate: string;
  endDate: string;
  webIcon: string;
  mobileIcon: string;

  lenderService: {
    id: number;
    lenderServiceDesc: string;

    lender: {
      id: number;
      lenderName: string;
      lenderDesc: string;
      lenderEmail: string;
      lenderPhone: string;
      photo: string;
      active: boolean;
    };

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
    active: boolean;
    maximumTerm: number;

    key: {
      id: string;
      descKey: string;
    };
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
