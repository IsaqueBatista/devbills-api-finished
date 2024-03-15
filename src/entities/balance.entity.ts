type BalanceProps = {
  _id?: string | null | number[];
  incomes: number;
  expenses: number;
  balance: number;
};

export class Balance {
  public _id?: string | null | number[];
  public incomes: number;
  public expenses: number;
  public balance: number;

  constructor({ _id, incomes, expenses, balance }: BalanceProps) {
    this._id = _id;
    this.incomes = incomes;
    this.expenses = expenses;
    this.balance = balance;
  }
}
