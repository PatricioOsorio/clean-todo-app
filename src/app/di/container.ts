import { container } from 'tsyringe';
import { CreateTodoUseCase, GetTodosUseCase, ToggleTodoUseCase } from '@/application/usecases';
import { MockTodoApi, MockTodoApiLocalStorage } from '@/infrastructure/http';
import { TodoRepository } from '@/infrastructure/repositories';
import type { ITodoApi } from '@/infrastructure/http/models';
import type { ITodoRepository } from '@/domain/repositories';
import { TOKENS } from './tokens';

type mockType = 'mock' | 'localStorageMock' | 'api';
const USE_MOCK: mockType = 'localStorageMock';

const mockImplementations: Record<mockType, typeof MockTodoApi> = {
  mock: MockTodoApi,
  localStorageMock: MockTodoApiLocalStorage,
  api: MockTodoApi,
};

// ! Repositories
container.register<ITodoApi>(TOKENS.TodoApi, {
  useClass: mockImplementations[USE_MOCK],
});

// ! Use Cases
container.register<ITodoRepository>(TOKENS.TodoRepository, {
  useFactory: (c) => {
    const todoApi = c.resolve<ITodoApi>(TOKENS.TodoApi);
    return new TodoRepository(todoApi);
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
