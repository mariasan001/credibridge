// models/form.types.ts o directamente en el mismo archivo
export interface FormDataState {
  userId: string;
  subject: string;
  description: string;
  ticketTypeId: string; // se convierte a number al enviar
  clarificationType: string; // igual, se convierte si aplica
  initialMessage: string;
  participantUserIds: number[]; // ya como array
}
