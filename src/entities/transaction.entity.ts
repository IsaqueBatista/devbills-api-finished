import { Category } from './category.entity';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

type TransactionProps = {
  title: string;
  amount: number;
  type: TransactionType;
  date: Date;
  category: Category;
};

export class Transaction {
  public _id?: string;
  public title: string;
  public amount: number;
  public type: TransactionType;
  public date: Date;
  public category: Category;

  constructor({ title, amount, type, date, category }: TransactionProps) {
    this.title = title;
    this.amount = amount;
    this.type = type;
    this.date = new Date(date);
    this.category = new Category(category);
  }
}
