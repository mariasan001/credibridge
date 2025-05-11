export interface Benefit {
  benefitsDesc: string;
}

export interface PromotionCreatePayload {
  promotionTitle: string;
  promotionDesc: string;
  startDate: string;
  endDate: string;

  webIcon: string ;
  mobileIcon: string;
  
  lenderServiceId: number;  // ✅ Requerido y debe tener un ID válido

  lenderId: number | null;  // ✅ Ahora puede ser null

  benefits: Benefit[];
}
