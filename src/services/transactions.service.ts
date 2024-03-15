import { TransactionsRepository } from '../database/repositories/transactions.repository';
import {
  CreateTransactionDTO,
  GetDashboardDTO,
  GetFinancialEvolutionDTO,
  IndexTransactionsDTO,
} from '../dtos/transactions.dto';
import { Balance } from '../entities/balance.entity';
import { Expense } from '../entities/expense.entity';
import { Transaction } from '../entities/transaction.entity';
import { CategoriesService } from './categories.service';

export class TransactionsService {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private categoriesService: CategoriesService,
  ) {}

  async create({
    amount,
    categoryId,
    date,
    title,
    type,
  }: CreateTransactionDTO): Promise<Transaction> {
    const findCategory = await this.categoriesService.find(categoryId);

    const transaction = new Transaction({
      amount,
      category: findCategory,
      date,
      title,
      type,
    });

    const createdTransaction =
      await this.transactionsRepository.create(transaction);

    return createdTransaction;
  }

  async index({
    title,
    categoryId,
    beginDate,
    endDate,
  }: IndexTransactionsDTO): Promise<Transaction[]> {
    return this.transactionsRepository.index({
      title,
      categoryId,
      beginDate,
      endDate,
    });
  }

  async getDashboard({
    beginDate,
    endDate,
  }: GetDashboardDTO): Promise<{ balance: Balance; expenses: Expense[] }> {
    let [balance, expenses] = await Promise.all([
      this.transactionsRepository.getBalance({
        beginDate,
        endDate,
      }),
      this.transactionsRepository.getExpenses({
        beginDate,
        endDate,
      }),
    ]);

    if (!balance) {
      balance = {
        _id: null,
        incomes: 0,
        expenses: 0,
        balance: 0,
      };
    }

    return { balance, expenses };
  }

  async getFinancialEvolution({
    year,
  }: GetFinancialEvolutionDTO): Promise<Balance[]> {
    return this.transactionsRepository.getFinancialEvolution({ year });
  }
}
