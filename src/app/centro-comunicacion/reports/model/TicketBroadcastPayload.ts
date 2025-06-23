export interface TicketBroadcastPayload {
  data: {
    userId: string;
    subject: string;
    description: string;
    ticketTypeId: number;
    clarification_type: number;
    initialMessage: string;
    participantUserIds: string[]; // lender IDs como strings
  };
  file?: File;
}
