import { err, ok, type IResult } from '@/shared/utils';
import type { ICreateTodoDTO } from '../dtos';
import type { ITodo } from '@/domain/entities';
import type { ITodoRepository } from '@/domain/repositories';
import type { IUseCase } from './IUseCase';

// @injectable()
export class CreateTodoUseCase implements IUseCase<ICreateTodoDTO, ITodo> {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(input?: ICreateTodoDTO): Promise<IResult<ITodo>> {
    const title = input?.title?.trim();
    if (!title) {
      return err(new Error('Title is required'));
    }

    try {
      const newTodo = await this.todoRepository.create(title);
      return ok(newTodo);
    } catch (e) {
      return err(e as Error);
    }
  }
}
