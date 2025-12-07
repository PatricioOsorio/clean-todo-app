import { container } from 'tsyringe';
import { GetTodosUseCase, ToggleTodoUseCase } from '@/application/usecases';
import { MockTodoApi } from '../http';
import { TodoRepositoryMock } from '../repositories';
import { TOKENS } from './tokens';
import type { ITodoRepository } from '@/domain/repositories';

// Repositories
container.register<MockTodoApi>(TOKENS.MockTodoApi, {
  useClass: MockTodoApi,
});

// Use Cases
container.register<ITodoRepository>(TOKENS.TodoRepository, {
  useClass: TodoRepositoryMock,
});

container.registerSingleton(GetTodosUseCase, GetTodosUseCase);
container.registerSingleton(ToggleTodoUseCase, ToggleTodoUseCase);

export { container };
