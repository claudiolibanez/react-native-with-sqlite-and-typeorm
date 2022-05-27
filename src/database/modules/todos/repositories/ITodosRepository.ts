import { ICreateTodoDTO } from '../dtos/ICreateTodoDTO';
import { Todo as TodoModel } from '../infra/typeorm/entities/Todo';

interface ITodosRepository {
  findAll(): Promise<TodoModel[]>;
  findOneById(id: number): Promise<TodoModel | undefined>;
  create(data: ICreateTodoDTO): Promise<TodoModel>;
  save(todo: TodoModel): Promise<TodoModel>;
  delete(id: number): Promise<void>;
}

export { ITodosRepository };
