import { identity } from "node_modules/cypress/types/lodash"

export interface WorkUnit {
  id: string
  desc: string
}

export interface Bank {
  id: number
  desc: string
}

export interface JobCode {
  id: string
  desc: string
}

export interface PositionStatus {
  id: number
  desc: string
}

export interface UserStatus {
  id: number
  desc: string
}

export interface Role {
  id: number
  description: string
}

export interface User {
  userId: string
  name: string
  email: string
  workUnit: WorkUnit
  rfc: string
  curp: string
  bank: Bank | null
  idPlaza: string
  jobCode: JobCode
  occupationDate: string
  idSs: string
  positionStatus: PositionStatus
  phone: string
  userStatus: UserStatus
  roles: Role[]
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

export interface LenderService {
  id: number
  lenderServiceDesc: string
  serviceType: {
    id: number
    serviceTypeDesc: string
  }
}

export interface Payment {
  date: string
  amount: number
}

export interface Contract {
  contractId: number
  installments: number
  discountsAplied: number | null
  biweeklyDiscount: number
  amount: number
  effectiveRate: number | null
  anualRate: number | null
  lastBalance: number | null
  newBalance: number | null
  user: User
  lender: Lender | null
  contractStatus: {
    id: number
    contractStatusDesc: string
  }
  lenderService: LenderService | null
  lastPayment: Payment | null
  nextPayment: Payment | null
}

export interface LenderSearchResponse {
  user: User
  discountLimit: number
  contracts: Contract[]
}
