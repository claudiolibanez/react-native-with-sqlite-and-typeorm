import { Category as CategoryModel } from '../infra/typeorm/entities/Category';

interface ICreateTodoDTO {
  name: string;

  description: string;

  categories: CategoryModel[];
}

export { ICreateTodoDTO };
