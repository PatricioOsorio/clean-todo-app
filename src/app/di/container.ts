import { container } from 'tsyringe';
import { CreateTodoUseCase, GetTodosUseCase, ToggleTodoUseCase } from '@/application/usecases';
import { MockTodoApi } from '@/infrastructure/http';
import { TodoRepositoryMock } from '@/infrastructure/repositories';
import type { ITodoApi } from '@/infrastructure/http/models';
import type { ITodoRepository } from '@/domain/repositories';
import { TOKENS } from './tokens';

// const USE_MOCK = true;

// ! Repositories
container.register<ITodoApi>(TOKENS.TodoApi, {
  useClass: MockTodoApi,
  // useClass: USE_MOCK ? MockTodoApi : SomeOtherTodoApiImplementation,
});

// ! Use Cases
container.register<ITodoRepository>(TOKENS.TodoRepository, {
  useFactory: (c) => {
    const todoApi = c.resolve<ITodoApi>(TOKENS.TodoApi);
    return new TodoRepositoryMock(todoApi);
  },
});

container.register(GetTodosUseCase, {
  useFactory: (c) => {
    const todoRepository = c.resolve<ITodoRepository>(TOKENS.TodoRepository);
    return new GetTodosUseCase(todoRepository);
  },
});

container.register(ToggleTodoUseCase, {
  useFactory: (c) => {
    const todoRepository = c.resolve<ITodoRepository>(TOKENS.TodoRepository);
    return new ToggleTodoUseCase(todoRepository);
  },
});

container.register(CreateTodoUseCase, {
  useFactory: (c) => {
    const todoRepository = c.resolve<ITodoRepository>(TOKENS.TodoRepository);
    return new CreateTodoUseCase(todoRepository);
  },
});

export { container };
