export interface Role {
  id: number
  description: string
}

export interface Lender {
  id: number
  lenderName: string
  lenderDesc: string
  lenderEmail: string
  lenderPhone: string
  photo: string | null
  active: boolean
}

export interface User {
  userId: string
  name: string
  email: string
  lender: Lender | null
  roles: Role[]
}
