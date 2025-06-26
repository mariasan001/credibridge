import { LucideIcon } from "lucide-react"

export interface MenuItem {
  label: string
  icon: LucideIcon
  route: string
  roles: number[]
  children?: MenuItem[] // submenús opcionales
}
