import { inject, injectable } from 'tsyringe';
import type { ICreateTodoDTO } from '../dtos/CreateTodoDTO';
import type { ITodo } from '@/domain/entities/Todo';
import type { ITodoRepository } from '@/domain/repositories/ITodoRepository';
import type { IUseCase } from './IUseCase';

@injectable()
export class CreateTodoUseCase implements IUseCase<ICreateTodoDTO, ITodo> {
  constructor(@inject('ITodoRepository') private todoRepository: ITodoRepository) {}

  async execute(input: ICreateTodoDTO): Promise<ITodo> {
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

    return todo;
  }
}
