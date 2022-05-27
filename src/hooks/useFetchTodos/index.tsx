import { useState } from 'react';
import { useDatabaseConnection } from '../../database';
import { Todo as TodoModel } from '../../database/modules/todos/infra/typeorm/entities/Todo';

function useFetchTodos() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [isLoading, setIsloading] = useState(false);

  const { todosRepository } = useDatabaseConnection();

  const fetchTodos = () => {
    setIsloading(true);

    todosRepository
      .findAll()
      .then(setTodos)
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => setIsloading(false));
  };

  return { todos, isLoading, fetchTodos };
}

export { useFetchTodos };
