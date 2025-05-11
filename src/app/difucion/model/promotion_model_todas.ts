export interface Promotion {
    id: number;
    promotionTitle: string;
    promotionDesc: string;
    startDate: string;
    endDate: string;
    webIcon: string;
    mobileIcon: string;
    lenderService: LenderService;
    lender: Lender;
    benefits: Benefit[];
  }
  
  export interface Benefit {
    benefitsDesc: string;
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
    active: boolean;
    maximumTerm: number;
    key: {
      id: string;
      descKey: string;
    };
  }
  
  export interface Lender {
    lenderName: string;
    lenderDesc: string;
    lenderEmail: string;
    lenderPhone: string;
    photo: string;
    active: boolean;
  }
  