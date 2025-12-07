import type { ApiTodo } from './models/ApiTodo';

let todosMock: ApiTodo[] = [
  {
    id: '1',
    title: 'Aprender Clean Architecture en front',
    completed: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Integrar tsyringe con React',
    completed: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: '3',
    title: 'Implementar casos de uso',
    completed: false,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
];

export class MockTodoApi {
  async getTodos(): Promise<ApiTodo[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return structuredClone(todosMock);
  }

  async getTodoById(id: string): Promise<ApiTodo | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const todo = todosMock.find((todo) => todo.id === id);

    if (!todo) return null;

    return structuredClone(todo);
  }

  async createTodo(title: string): Promise<ApiTodo> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newTodo: ApiTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      created_at: new Date().toISOString(),
    };

    todosMock = [newTodo, ...todosMock];

    return structuredClone(newTodo);
  }

  async toggleTodo(id: string): Promise<ApiTodo> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const todoIndex = todosMock.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    todosMock[todoIndex].completed = !todosMock[todoIndex].completed;

    return structuredClone(todosMock[todoIndex]);
  }
}
