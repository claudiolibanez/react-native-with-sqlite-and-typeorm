import { Todo as TodoModel } from '../infra/typeorm/entities/Todo';

interface ICreateCategoryDTO {
  name: string;

  description: string;

  todo: TodoModel;
}

export { ICreateCategoryDTO };
