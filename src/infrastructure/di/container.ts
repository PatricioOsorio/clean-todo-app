import { container } from 'tsyringe';
import { MockTodoApi } from '../http';
import type { ITodoRepository } from '@/domain/repositories';
import { TodoRepositoryMock } from '../repositories';

// Repositories
container.register<MockTodoApi>('MockTodoApi', {
  useClass: MockTodoApi,
});

// Use Cases
container.register<ITodoRepository>('ITodoRepository', {
  useClass: TodoRepositoryMock,
});

export { container };
