// usuario.models.ts

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: Usuario
}

export interface Rol {
  id: number
  description: string
}

export interface CatalogoGenerico {
  id: string | number
  desc: string
}

export interface Usuario {
  userId: string
  name: string
  email: string
  rfc: string
  curp: string
  idPlaza: string
  idSs: string
  occupationDate: string

  phone: string | null
  dateOfBirth: string | null
  address: string | null
  addressType: string | null
  street: string | null
  addressNumber: string | null
  addressDistrict: string | null
  addressCity: string | null
  country: string | null
  state: string | null
  lender: string | null
  userStatus: string | null
  gender: string | null
  maritalStatus: string | null

  workUnit: CatalogoGenerico
  jobCode: CatalogoGenerico
  positionStatus: CatalogoGenerico & { id: number } // mismo formato, pero con ID numérico

  roles: Rol[]
}
