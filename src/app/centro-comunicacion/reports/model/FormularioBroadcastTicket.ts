interface Lender {
  userId: string | number | readonly string[] | undefined;
  id: number;
  lenderName: string;
  active: boolean;
}
