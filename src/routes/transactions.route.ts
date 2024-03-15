import { Router } from 'express';

import { TransactionsController } from '../controllers/transactions.controller';
import {
  createTransactionSchema,
  getDashboardSchema,
  getFinancialEvolutionSchema,
  indexTransactionsSchema,
} from '../dtos/transactions.dto';
import { TransactionsFactory } from '../factories/transactions.factory';
import { ParamsTypes, validate } from '../middlewares/validator';

export const transactionsRoutes = Router();

const service = TransactionsFactory.getServiceInstance();
const controller = new TransactionsController(service);

transactionsRoutes.get(
  '/',
  validate({ schema: indexTransactionsSchema, type: ParamsTypes.QUERY }),
  controller.index,
);

transactionsRoutes.get(
  '/dashboard',
  validate({ schema: getDashboardSchema, type: ParamsTypes.QUERY }),
  controller.getDashboard,
);

transactionsRoutes.get(
  '/financial-evolution',
  validate({ schema: getFinancialEvolutionSchema, type: ParamsTypes.QUERY }),
  controller.getFinancialEvolution,
);

transactionsRoutes.post(
  '/',
  validate({ schema: createTransactionSchema, type: ParamsTypes.BODY }),
  controller.create,
);
