import type { ITodo } from '../entities/Todo';

export interface ITodoRepository {
  getAll(): Promise<ITodo[]>;
  getById(id: string): Promise<ITodo | null>;
  create(todo: ITodo): Promise<void>;
  toggle(id: string): Promise<void>;
}
