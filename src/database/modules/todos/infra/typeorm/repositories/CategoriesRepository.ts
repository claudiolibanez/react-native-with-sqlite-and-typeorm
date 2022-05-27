import { Connection, Repository } from 'typeorm';
import { ICreateCategoryDTO } from '../../../dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository';
import { Category as CategoryModel } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private readonly ormRepository: Repository<CategoryModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(CategoryModel);
  }

  public async create({
    name,
    description,
    todo,
  }: ICreateCategoryDTO): Promise<CategoryModel> {
    const category = this.ormRepository.create({
      name,
      description,
      todo,
    });

    await this.ormRepository.save(category);

    return category;
  }
}

export { CategoriesRepository };
