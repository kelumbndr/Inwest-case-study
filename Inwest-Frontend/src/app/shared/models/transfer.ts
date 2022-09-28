export class Transfer {
  id: string;
  iban: string;
  accountHolder: string;
  date: string;
  note: string;
  amount: number;
  constructor(){
    this.iban = '';
    this.accountHolder = '';
    this.date = '';
    this.note = '';
    this.amount = 0;
  }
}
