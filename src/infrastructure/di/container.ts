import { container } from 'tsyringe';
import { GetTodosUseCase, ToggleTodoUseCase } from '@/application/usecases';
import { MockTodoApi } from '../http';
import { TodoRepositoryMock } from '../repositories';
import type { ITodoRepository } from '@/domain/repositories';

// Repositories
container.register<MockTodoApi>('MockTodoApi', {
  useClass: MockTodoApi,
});

// Use Cases
container.register<ITodoRepository>('ITodoRepository', {
  useClass: TodoRepositoryMock,
});

container.registerSingleton(GetTodosUseCase, GetTodosUseCase);
container.registerSingleton(ToggleTodoUseCase, ToggleTodoUseCase);

export { container };
