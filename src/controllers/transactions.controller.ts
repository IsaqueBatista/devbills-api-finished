import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  IndexTransactionsDTO,
  CreateTransactionDTO,
  GetDashboardDTO,
  GetFinancialEvolutionDTO,
} from '../dtos/transactions.dto';
import { TransactionsService } from '../services/transactions.service';
import { BodyRequest, QueryRequest } from './types';

export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  create = async (
    req: BodyRequest<CreateTransactionDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { amount, categoryId, date, title, type } = req.body;

      const transaction = await this.transactionsService.create({
        amount,
        categoryId,
        date,
        title,
        type,
      });

      res.status(StatusCodes.CREATED).json(transaction);
    } catch (err) {
      next(err);
    }
  };

  index = async (
    req: QueryRequest<IndexTransactionsDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { title, categoryId, beginDate, endDate } = req.query;

      const transactions = await this.transactionsService.index({
        title,
        categoryId,
        beginDate,
        endDate,
      });

      res.status(StatusCodes.OK).json(transactions);
    } catch (err) {
      next(err);
    }
  };

  getDashboard = async (
    req: QueryRequest<GetDashboardDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { beginDate, endDate } = req.query;

      const dashboard = await this.transactionsService.getDashboard({
        beginDate,
        endDate,
      });

      res.status(StatusCodes.OK).json(dashboard);
    } catch (err) {
      next(err);
    }
  };

  getFinancialEvolution = async (
    req: QueryRequest<GetFinancialEvolutionDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { year } = req.query;

      const financialEvolution =
        await this.transactionsService.getFinancialEvolution({ year });

      res.status(StatusCodes.OK).json(financialEvolution);
    } catch (err) {
      next(err);
    }
  };
}
