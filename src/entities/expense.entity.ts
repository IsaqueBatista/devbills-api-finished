type ExpenseProps = {
  _id?: string;
  title: string;
  amount: number;
  color: string;
};

export class Expense {
  public _id?: string;
  public title: string;
  public amount: number;
  public color: string;

  constructor({ _id, title, amount, color }: ExpenseProps) {
    this._id = _id;
    this.title = title;
    this.amount = amount;
    this.color = color;
  }
}
