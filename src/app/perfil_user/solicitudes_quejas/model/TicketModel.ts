export interface TicketMessage {
  senderName: string;
  content: string;
  isInternal: boolean;
  sendDate: string;
  roles: string[];
}

export interface TicketModel {
  ticketId: number;
  subject: string;
  description: string;
  ticketType: string;
  status: string;
  lenderName: string;
  clarificationType: string;
  assignedTo: string;
  user: string;
  creationDate: string;
  lastResponse: string;
  messages: TicketMessage[];
}
