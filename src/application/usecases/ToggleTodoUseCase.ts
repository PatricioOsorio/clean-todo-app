import { inject, injectable } from 'tsyringe';
import { ok, type IResult } from '@/shared/utils';
import { TOKENS } from '@/infrastructure/di';
import type { ITodo } from '@/domain/entities';
import type { ITodoRepository } from '@/domain/repositories';
import type { IUseCase } from './IUseCase';

@injectable()
export class ToggleTodoUseCase implements IUseCase<string, ITodo> {
  constructor(@inject(TOKENS.TodoRepository) private todoRepository: ITodoRepository) {}

  async execute(id: string): Promise<IResult<ITodo>> {
    if (!id) {
      throw new Error('Id is required');
    }

    const toggledTodo = await this.todoRepository.toggle(id);

    return ok(toggledTodo);
  }
}
