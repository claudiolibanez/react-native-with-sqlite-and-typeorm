import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import uuid from 'react-native-uuid';

import { Todo as TodoModel } from './Todo';

@Entity('categories')
class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  todo_id: string;

  // @OneToOne(() => TodoModel)
  @ManyToOne(() => TodoModel)
  @JoinColumn({ name: 'todo_id' })
  todo: TodoModel;

  constructor() {
    super();

    if (!this.id) {
      this.id = uuid.v4().toString();
    }
  }
}

export { Category };
