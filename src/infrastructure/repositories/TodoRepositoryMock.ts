import { injectable } from 'tsyringe';
import type { ITodo } from '@/domain/entities/Todo';
import type { ITodoRepository } from '@/domain/repositories/ITodoRepository';
import type { MockTodoApi } from '../http/MockTodoApi';

@injectable()
export class TodoRepositoryMock implements ITodoRepository {
  constructor(private api: MockTodoApi) {}

  getAll(): Promise<ITodo[]> {
    return this.api.getTodos();
  }

  getById(id: string): Promise<ITodo | null> {
    return this.api.getTodoById(id);
  }
  create(todo: ITodo): Promise<boolean> {
    return this.api.createTodo(todo.title);
  }

  toggle(id: string): Promise<ITodo> {
    return this.api.toggleTodo(id);
  }
}
