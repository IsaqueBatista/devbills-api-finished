import { Category } from '../../entities/category.entity';
import { CategoryModel } from '../schemas/category.schema';

export class CategoriesRepository {
  constructor(private model: typeof CategoryModel) {}

  async create({ title, color }: Category): Promise<Category> {
    const createdCategory = await this.model.create({ title, color });

    return createdCategory.toObject<Category>();
  }

  async findByTitle(title: string): Promise<Category | undefined> {
    const category = await this.model.findOne({ title });

    return category?.toObject<Category>();
  }

  async index(title?: string): Promise<Category[]> {
    const filter = title ? { title: { $regex: title, $options: 'i' } } : {};

    const categories = await this.model.find(filter);

    return categories.map((item) => item.toObject<Category>());
  }

  async findById(id: string): Promise<Category | undefined> {
    const category = await this.model.findById(id);

    return category?.toObject<Category>();
  }
}
