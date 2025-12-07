import type { ITodoEntity } from './ITodoEntity';

export interface ITodoApi {
  getTodos(): Promise<ITodoEntity[]>;
  getTodoById(id: string): Promise<ITodoEntity | null>;
  createTodo(title: string): Promise<ITodoEntity>;
  toggleTodo(id: string): Promise<ITodoEntity>;
}
