import type { ITodo } from '@/domain/entities';
import type { ApiTodo } from '../http/models/ApiTodo';

export const mapApiTodoToDomain = (api: ApiTodo): ITodo => ({
  id: api.id,
  title: api.title,
  completed: api.completed,
  createdAt: new Date(api.created_at),
});

export const mapApiTodosToDomain = (apiTodos: ApiTodo[]): ITodo[] => apiTodos.map(mapApiTodoToDomain);

// if maybe needed in some case to send something to the backend:
export const mapDomainTodoToApi = (todo: ITodo): ApiTodo => ({
  id: todo.id,
  title: todo.title,
  completed: todo.completed,
  created_at: todo.createdAt.toISOString(),
});
