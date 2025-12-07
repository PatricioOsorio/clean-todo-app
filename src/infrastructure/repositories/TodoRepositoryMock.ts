import { inject, injectable } from 'tsyringe';
import type { ITodo } from '@/domain/entities';
import type { ITodoRepository } from '@/domain/repositories';
import type { MockTodoApi } from '../http';

@injectable()
export class TodoRepositoryMock implements ITodoRepository {
  constructor(@inject('MockTodoApi') private api: MockTodoApi) {}

  getAll(): Promise<ITodo[]> {
    return this.api.getTodos();
  }

  getById(id: string): Promise<ITodo | null> {
    return this.api.getTodoById(id);
  }

  create(todo: ITodo): Promise<ITodo> {
    return this.api.createTodo(todo.title);
  }

  toggle(id: string): Promise<ITodo> {
    return this.api.toggleTodo(id);
  }
}
