import { inject, injectable } from 'tsyringe';
import type { ITodo } from '@/domain/entities';
import type { ITodoRepository } from '@/domain/repositories';
import type { IUseCase } from './IUseCase';

@injectable()
export class ToggleTodoUseCase implements IUseCase<string, ITodo> {
  constructor(@inject('ITodoRepository') private todoRepository: ITodoRepository) {}

  async execute(id: string): Promise<ITodo> {
    if (!id) {
      throw new Error('Id is required');
    }
    
    return this.todoRepository.toggle(id);
  }
}
