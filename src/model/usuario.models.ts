// model/usuario.models.ts
export interface LoginPayload {
    username: string
    password: string
  }
  
  export interface Role {
    id: number
    description: string
  }
  
  export interface LoginResponse {
    token: string
    roles: Role[]
  }
  