import { injectable, inject } from 'tsyringe';
import { ok, type IResult } from '@/shared/utils';
import { TOKENS } from '@/infrastructure/di';
import type { ITodo } from '@/domain/entities';
import type { ITodoRepository } from '@/domain/repositories';
import type { IUseCase } from './IUseCase';

@injectable()
export class GetTodosUseCase implements IUseCase<void, ITodo[]> {
  constructor(@inject(TOKENS.TodoRepository) private todoRepository: ITodoRepository) {}

  async execute(): Promise<IResult<ITodo[]>> {
    const todos = await this.todoRepository.getAll();
    const sortedTodos = todos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return ok(sortedTodos);
  }
}
