import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import uuid from 'react-native-uuid';

import { Category as CategoryModel } from './Category';

@Entity('todos')
class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => CategoryModel, category => category.todo)
  categories: CategoryModel[];

  constructor() {
    super();

    if (!this.id) {
      this.id = uuid.v4().toString();
    }
  }
}

export { Todo };
