import type { ITodo } from '../entities/Todo';

export interface ITodoRepository {
  getAll(): Promise<ITodo[]>;
  create(todo: ITodo): Promise<void>;
  toggle(id: string): Promise<void>;
}
