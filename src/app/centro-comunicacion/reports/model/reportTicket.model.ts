// reports/model/reportTicket.model.ts

export interface ReportTicket {
  id: number
  status: string
  startDate: string
  lastMessageDate: string
  type: string
  ticket: {
    ticketId: number
    subject: string
    description: string
    ticketType: string
    status: string
    clarificationType: string
    user: string
    creationDate: string
    lastResponse: string
  }
  participants: {
    userId: string
    fullName: string
  }[]
  messageDtos: {
    id: number
    senderId: string
    content: string
    sentAt: string
  }[]
}
