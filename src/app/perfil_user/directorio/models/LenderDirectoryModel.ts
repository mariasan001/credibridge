export interface LenderDirectoryResponse {
    serviceTypeId: number;
    serviceTypeDesc: string;
    services: LenderServiceItem[];
  }
  
  export interface LenderServiceItem {
    lender: {
      id: number;
      lenderName: string;
      lenderDesc: string;
      lenderEmail: string;
      lenderPhone: string;
      photo: string;
      active: boolean;
    };
    serviceDesc: string;
    rate: number;
  }
  