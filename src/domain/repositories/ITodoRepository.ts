import type { ITodo } from '../entities';

export interface ITodoRepository {
  getAll(): Promise<ITodo[]>;
  getById(id: string): Promise<ITodo | null>;
  create(todo: ITodo): Promise<ITodo>;
  toggle(id: string): Promise<ITodo>;
}
