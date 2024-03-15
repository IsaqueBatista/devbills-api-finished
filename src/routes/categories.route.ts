import { Router } from 'express';

import { CategoriesController } from '../controllers/categories.controller';
import {
  createCategorySchema,
  indexCategoriesSchema,
} from '../dtos/categories.dto';
import { CategoriesFactory } from '../factories/categories.factory';
import { ParamsTypes, validate } from '../middlewares/validator';

export const categoriesRoutes = Router();

const service = CategoriesFactory.getServiceInstance();
const controller = new CategoriesController(service);

categoriesRoutes.get(
  '/',
  validate({
    schema: indexCategoriesSchema,
    type: ParamsTypes.QUERY,
  }),
  controller.index,
);

categoriesRoutes.post(
  '/',
  validate({
    schema: createCategorySchema,
    type: ParamsTypes.BODY,
  }),
  controller.create,
);
