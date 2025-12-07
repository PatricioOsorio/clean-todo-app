import { inject, injectable } from 'tsyringe';
import { mapApiTodosToDomain, mapApiTodoToDomain } from '../mappers';
import { TOKENS } from '../di';
import type { ITodo } from '@/domain/entities';
import type { ITodoRepository } from '@/domain/repositories';
import type { ITodoApi } from '../http/models';

@injectable()
export class TodoRepositoryMock implements ITodoRepository {
  constructor(@inject(TOKENS.TodoApi) private api: ITodoApi) {}

  async getAll(): Promise<ITodo[]> {
    const apiTodos = await this.api.getTodos();
    return mapApiTodosToDomain(apiTodos);
  }

  async getById(id: string): Promise<ITodo | null> {
    const apiTodo = await this.api.getTodoById(id);

    if (!apiTodo) return null;

    return mapApiTodoToDomain(apiTodo);
  }

  async create(title: string): Promise<ITodo> {
    const apiTodo = await this.api.createTodo(title);

    return mapApiTodoToDomain(apiTodo);
  }

  async toggle(id: string): Promise<ITodo> {
    const apiTodo = await this.api.toggleTodo(id);

    return mapApiTodoToDomain(apiTodo);
  }
}
