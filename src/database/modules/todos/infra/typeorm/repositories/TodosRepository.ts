import { Connection, Repository } from 'typeorm';
import { ICreateTodoDTO } from '../../../dtos/ICreateTodoDTO';
import { ITodosRepository } from '../../../repositories/ITodosRepository';
import { Todo as TodoModel } from '../entities/Todo';

class TodosRepository implements ITodosRepository {
  private readonly ormRepository: Repository<TodoModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(TodoModel);
  }

  public async findAll(): Promise<TodoModel[]> {
    const todos = await this.ormRepository.find({
      relations: ['categories'],
    });

    return todos;
  }

  public async findOneById(id: number): Promise<TodoModel> {
    const todos = await this.ormRepository.findOneBy({ id });

    return todos;
  }

  public async create({
    name,
    description,
    categories,
  }: ICreateTodoDTO): Promise<TodoModel> {
    const todo = this.ormRepository.create({
      name,
      description,
      categories,
    });

    await this.ormRepository.save(todo);

    return todo;
  }

  public async save(todo: TodoModel): Promise<TodoModel> {
    return this.ormRepository.save(todo);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export { TodosRepository };
