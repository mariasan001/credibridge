export interface PromotionBenefit {
    id: number;
    benefitsDesc: string;
  }
  
  export interface PromotionCreate {
    id?: number;
    promotionTitle: string;
    promotionDesc: string;
    startDate: string;
    endDate: string;
    webIcon: string;
    mobileIcon: string;
    lenderServiceId: number;
    lenderId: number;
    benefits: PromotionBenefit[];
  }
  