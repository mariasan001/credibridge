// model/TicketDetailModel.ts

export interface TicketMessage {
  senderName: string;
  content: string;
  isInternal: boolean;
  sendDate: string;
  roles: string[];
}

export interface TicketDetailModel {
  ticketId: number;
  subject: string;
  description: string;
  ticketType: string;
  status: string;
  lenderName: string;
  clarificationType: string;
  assignedTo: string | null;
  user: string;
  creationDate: string;
  lastResponse: string;
  messages: TicketMessage[];
}
