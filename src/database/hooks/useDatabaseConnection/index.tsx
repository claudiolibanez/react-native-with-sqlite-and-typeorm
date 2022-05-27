import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Connection, createConnection } from 'typeorm';
import RNFS from 'react-native-fs';

import { TodosRepository } from '../../modules/todos/infra/typeorm/repositories/TodosRepository';
import { Todo as TodoModel } from '../../modules/todos/infra/typeorm/entities/Todo';
import { CreateTodo1653617608895 } from '../../migrations/1653617608895-CreateTodo';

import { CategoriesRepository } from '../../modules/todos/infra/typeorm/repositories/CategoriesRepository';
import { Category as CategoryModel } from '../../modules/todos/infra/typeorm/entities/Category';
import { CreateCategory1653625744718 } from '../../migrations/1653625744718-CreateCategory';

interface DatabaseConnectionContextData {
  todosRepository: TodosRepository;
  categoriesRepository: CategoriesRepository;
}

interface DatabaseConnectionProviderProps {
  children: ReactNode;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData,
);

const DatabaseConnectionProvider = ({
  children,
}: DatabaseConnectionProviderProps) => {
  const [connection, setConnection] = useState<Connection | null>(null);

  const connect = useCallback(async () => {
    const dbName = 'giveplus';
    const dbAssetsPath = `www/${dbName}`;

    const dbPath = `/data/data/com.reactnativesqlitetypeorm/databases/${dbName}`;

    const exists = await RNFS.exists(dbPath.concat('.db'));

    if (!exists) {
      try {
        // TODO: Check if database already exists
        // await RNFS.existsAssets(`www/${dbName}.db`);

        await RNFS.mkdir('/data/data/com.reactnativesqlitetypeorm/databases');

        await RNFS.copyFileAssets(
          dbAssetsPath.concat('.db'),
          dbPath.concat('.db'),
        );
      } catch (error) {
        console.error('>>> getDatabasePath error', error);
      }
    }

    const createdConnection = await createConnection({
      type: 'react-native',
      name: dbName,
      database: dbName.concat('.db'),
      entities: [TodoModel, CategoryModel],
      location: 'default',

      // If you're not using migrations, you can delete these lines,
      // since the default is no migrations:
      migrations: [CreateTodo1653617608895, CreateCategory1653625744718],
      migrationsRun: false,

      // If you're not using migrations also set this to true
      synchronize: true,
      logging: false,
    });

    setConnection(createdConnection);
  }, []);

  useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connect, connection]);

  if (!connection) {
    return null;
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{
        todosRepository: new TodosRepository(connection),
        categoriesRepository: new CategoriesRepository(connection),
      }}
    >
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext);

  if (!context) {
    throw new Error(
      'useDatabaseConnection must be used within an DatabaseConnectionProvider',
    );
  }

  return context;
}

export { DatabaseConnectionProvider, useDatabaseConnection };
