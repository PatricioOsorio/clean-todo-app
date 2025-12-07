import { container } from 'tsyringe';
import { CreateTodoUseCase, GetTodosUseCase, ToggleTodoUseCase } from '@/application/usecases';
import { MockTodoApi } from '../http';
import { TodoRepositoryMock } from '../repositories';
import { TOKENS } from '@/shared/di';
import type { ITodoApi } from '../http/models';
import type { ITodoRepository } from '@/domain/repositories';

// const USE_MOCK = true;

// Repositories
container.register<ITodoApi>(TOKENS.TodoApi, {
  useClass: MockTodoApi,
  // useClass: USE_MOCK ? MockTodoApi : SomeOtherTodoApiImplementation,
});

// Use Cases
container.register<ITodoRepository>(TOKENS.TodoRepository, {
  useClass: TodoRepositoryMock,
});

container.registerSingleton(GetTodosUseCase, GetTodosUseCase);
container.registerSingleton(ToggleTodoUseCase, ToggleTodoUseCase);
container.registerSingleton(CreateTodoUseCase, CreateTodoUseCase);

export { container };
