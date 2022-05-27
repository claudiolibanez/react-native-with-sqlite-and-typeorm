import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { Category as CategoryModel } from '../infra/typeorm/entities/Category';

interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<CategoryModel>;
}

export { ICategoriesRepository };
