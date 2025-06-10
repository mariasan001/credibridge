export interface Ticket {
  ticketId: number
  subject: string
  description: string
  ticketType: "SOLICITUD" | "QUEJA"
  status: string
  lenderName: string
  clarificationType: string | null
  assignedTo: string | null
  user: string
  creationDate: string
  lastResponse: string
  messages: any | null
}