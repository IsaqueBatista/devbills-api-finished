import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CreateCategoryDTO, IndexCategoriesDTO } from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';
import { BodyRequest, QueryRequest } from './types';

export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  create = async (
    req: BodyRequest<CreateCategoryDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    const { title, color } = req.body;

    try {
      const category = await this.categoriesService.create({ title, color });

      res.status(StatusCodes.CREATED).json(category);
    } catch (err) {
      next(err);
    }
  };

  index = async (
    req: QueryRequest<IndexCategoriesDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    const { title } = req.query;

    try {
      const categories = await this.categoriesService.index(title as string);

      res.status(StatusCodes.OK).json(categories);
    } catch (err) {
      next(err);
    }
  };
}
