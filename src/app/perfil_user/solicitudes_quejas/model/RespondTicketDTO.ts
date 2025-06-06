export interface RespondTicketDTO {
  ticketId: number;
  senderId: string;
  message: string;
  isInternal: boolean;
}