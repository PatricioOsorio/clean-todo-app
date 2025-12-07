import type { ITodo } from '@/domain/entities';
import type { ITodoUI } from '../models/ITodoUI.ts';

export const mapTodoToUI = (todo: ITodo): ITodoUI => ({
  id: todo.id,
  title: todo.title,
  completed: todo.completed,
  createdAtLabel: todo.createdAt.toLocaleDateString(),
});

export const mapTodosToUI = (todos: ITodo[]): ITodoUI[] => todos.map(mapTodoToUI);
