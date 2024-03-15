import { StatusCodes } from 'http-status-codes';

import { CategoriesRepository } from '../database/repositories/categories.repository';
import { CreateCategoryDTO } from '../dtos/categories.dto';
import { Category } from '../entities/category.entity';
import { AppError } from '../errors/app.error';

export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async create({ color, title }: CreateCategoryDTO): Promise<Category> {
    const findCategory = await this.categoriesRepository.findByTitle(title);

    if (findCategory) {
      throw new AppError('Category already exists.', StatusCodes.BAD_REQUEST);
    }

    const category = new Category({
      color,
      title,
    });

    const createdCategory = await this.categoriesRepository.create(category);

    return createdCategory;
  }

  async index(title?: string): Promise<Category[]> {
    const categories = await this.categoriesRepository.index(title);

    return categories;
  }

  async find(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found.', StatusCodes.NOT_FOUND);
    }

    return category;
  }
}
