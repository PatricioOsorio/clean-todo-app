import { injectable, inject } from 'tsyringe';
import type { ITodo } from '@/domain/entities';
import type { ITodoRepository } from '@/domain/repositories';
import type { IUseCase } from './IUseCase';

@injectable()
export class GetTodosUseCase implements IUseCase<void, ITodo[]> {
  constructor(@inject('ITodoRepository') private todoRepository: ITodoRepository) {}

  async execute(): Promise<ITodo[]> {
    const todos = await this.todoRepository.getAll();
    return todos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}
