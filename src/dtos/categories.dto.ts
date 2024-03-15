import { z } from 'zod';

export const createCategorySchema = {
  title: z.string(),
  color: z.string().regex(/^#[A-Fa-f0-9]{6}$/),
};

const createCategoryObject = z.object(createCategorySchema);
export type CreateCategoryDTO = z.infer<typeof createCategoryObject>;

export const indexCategoriesSchema = {
  title: z.coerce.string().optional(),
};

const indexCategoriesObject = z.object(indexCategoriesSchema);
export type IndexCategoriesDTO = z.infer<typeof indexCategoriesObject>;
