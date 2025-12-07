import { inject, injectable } from 'tsyringe';
import type { ICreateTodoDTO } from '../dtos';
import type { ITodo } from '@/domain/entities';
import type { ITodoRepository } from '@/domain/repositories';
import type { IUseCase } from './IUseCase';

@injectable()
export class CreateTodoUseCase implements IUseCase<ICreateTodoDTO, boolean> {
  constructor(@inject('ITodoRepository') private todoRepository: ITodoRepository) {}

  async execute(input: ICreateTodoDTO): Promise<boolean> {
    if (!input.title || input.title.trim().length === 0) {
      throw new Error('Title is required');
    }

    const todo: ITodo = {
      id: crypto.randomUUID(),
      title: input.title,
      completed: false,
      createdAt: new Date(),
    };

    await this.todoRepository.create(todo);

    return true;
  }
}
