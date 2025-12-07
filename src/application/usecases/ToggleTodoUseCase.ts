import { err, ok, type IResult } from '@/shared/utils';
import type { ITodo } from '@/domain/entities';
import type { ITodoRepository } from '@/domain/repositories';
import type { IUseCase } from './IUseCase';

export class ToggleTodoUseCase implements IUseCase<string, ITodo> {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(id: string): Promise<IResult<ITodo>> {
    if (!id) {
      return err(new Error('Id is required'));
    }

    try {
      const toggledTodo = await this.todoRepository.toggle(id);
      return ok(toggledTodo);
    } catch (error) {
      return err(error as Error);
    }
  }
}
