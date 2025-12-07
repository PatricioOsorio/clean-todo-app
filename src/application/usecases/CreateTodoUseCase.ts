import { inject, injectable } from 'tsyringe';
import type { ICreateTodoDTO } from '../dtos';
import type { ITodo } from '@/domain/entities';
import type { ITodoRepository } from '@/domain/repositories';
import type { IUseCase } from './IUseCase';

@injectable()
export class CreateTodoUseCase implements IUseCase<ICreateTodoDTO, ITodo> {
  constructor(@inject('ITodoRepository') private todoRepository: ITodoRepository) {}

  async execute(input: ICreateTodoDTO): Promise<ITodo> {
    const title = input.title?.trim();
    if (!title) {
      throw new Error('Title is required');
    }

    const newTodo = this.todoRepository.create(title);

    return newTodo;
  }
}
