import { TransactionsRepository } from '../database/repositories/transactions.repository';
import { TransactionModel } from '../database/schemas/transaction.schema';
import { TransactionsService } from '../services/transactions.service';
import { CategoriesFactory } from './categories.factory';

export class TransactionsFactory {
  private static transactionsService: TransactionsService;

  static getServiceInstance() {
    if (this.transactionsService) {
      return this.transactionsService;
    }

    const categoriesService = CategoriesFactory.getServiceInstance();
    const repository = new TransactionsRepository(TransactionModel);
    const service = new TransactionsService(repository, categoriesService);

    this.transactionsService = service;

    return service;
  }
}
