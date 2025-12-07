import { container } from 'tsyringe';
import { MockTodoApi } from '../http/MockTodoApi';
import type { ITodoRepository } from '@/domain/repositories/ITodoRepository';
import { TodoRepositoryMock } from '../repositories/TodoRepositoryMock';

// Repositories
container.register<MockTodoApi>('MockTodoApi', {
  useClass: MockTodoApi,
});

// Use Cases
container.register<ITodoRepository>('ITodoRepository', {
  useClass: TodoRepositoryMock,
});

export { container };
