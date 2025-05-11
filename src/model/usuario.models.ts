export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: Usuario;
}

export interface Rol {
  id: number;
  description: string;
}

export interface CatalogoGenerico {
  id: string | number;
  desc: string;
}

export interface Lender {
  id: number;
  lenderName: string;
  lenderDesc: string;
  lenderEmail: string;
  lenderPhone: string;
  photo: string | null;
  active: boolean;
}

export interface Usuario {
  userId: string;
  name: string;
  email: string;

  // Estos pueden ser null
  rfc: string | null;
  curp: string | null;
  idPlaza: string | null;
  idSs: string | null;
  occupationDate: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  address: string | null;
  addressType: string | null;
  street: string | null;
  addressNumber: string | null;
  addressDistrict: string | null;
  addressCity: string | null;
  country: string | null;
  state: string | null;
  userStatus: string | null;
  gender: string | null;
  maritalStatus: string | null;

  // Estos también pueden ser null
  workUnit: CatalogoGenerico | null;
  jobCode: CatalogoGenerico | null;
  positionStatus: (CatalogoGenerico & { id: number }) | null;

  lender: Lender | null;

  roles: Rol[];
}
