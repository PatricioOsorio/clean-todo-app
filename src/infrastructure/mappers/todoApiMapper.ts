import type { ITodo } from '@/domain/entities';
import type { ITodoEntity } from '../http/models/ITodoEntity';

export const mapApiTodoToDomain = (api: ITodoEntity): ITodo => ({
  id: api.id,
  title: api.title,
  completed: api.completed,
  createdAt: new Date(api.created_at),
});

export const mapApiTodosToDomain = (apiTodos: ITodoEntity[]): ITodo[] => apiTodos.map(mapApiTodoToDomain);

// if maybe needed in some case to send something to the backend:
export const mapDomainTodoToApi = (todo: ITodo): ITodoEntity => ({
  id: todo.id,
  title: todo.title,
  completed: todo.completed,
  created_at: todo.createdAt.toISOString(),
});
