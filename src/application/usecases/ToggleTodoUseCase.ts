import { inject, injectable } from 'tsyringe';
import type { ITodo } from '@/domain/entities/Todo';
import type { ITodoRepository } from '@/domain/repositories/ITodoRepository';
import type { IUseCase } from './IUseCase';

@injectable()
export class ToggleTodoUseCase implements IUseCase<string, ITodo> {
  constructor(@inject('ITodoRepository') private todoRepository: ITodoRepository) {}

  async execute(id: string): Promise<ITodo> {
    if (!id || id.trim().length === 0) {
      throw new Error('ID is required');
    }

    const todo = await this.todoRepository.getById(id);
    if (!todo) {
      throw new Error('Todo not found');
    }

    await this.todoRepository.toggle(id);

    return { ...todo, completed: !todo.completed };
  }
}
