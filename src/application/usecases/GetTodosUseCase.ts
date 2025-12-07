import { injectable, inject } from 'tsyringe';
import { err, ok, type IResult } from '@/shared/utils';
import { TOKENS } from '@/shared/di';
import type { ITodo } from '@/domain/entities';
import type { ITodoRepository } from '@/domain/repositories';
import type { IUseCase } from './IUseCase';

@injectable()
export class GetTodosUseCase implements IUseCase<void, ITodo[]> {
  constructor(@inject(TOKENS.TodoRepository) private todoRepository: ITodoRepository) {}

  async execute(): Promise<IResult<ITodo[]>> {
    try {
      const todos = await this.todoRepository.getAll();
      const sortedTodos = todos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      return ok(sortedTodos);
    } catch (error) {
      return err(error as Error);
    }
  }
}
