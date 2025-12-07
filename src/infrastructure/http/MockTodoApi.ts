import type { ITodo } from '@/domain/entities';

let todosMock: ITodo[] = [
  {
    id: '1',
    title: 'Aprender Clean Architecture en front',
    completed: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Integrar tsyringe con React',
    completed: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: '3',
    title: 'Implementar casos de uso',
    completed: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  }
];

export class MockTodoApi {
  async getTodos(): Promise<ITodo[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return structuredClone(todosMock);
  }

  async getTodoById(id: string): Promise<ITodo | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const todo = todosMock.find((todo) => todo.id === id);

    if (!todo) return null;

    return structuredClone(todo);
  }

  async createTodo(title: string): Promise<ITodo> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newTodo: ITodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    };

    todosMock = [newTodo, ...todosMock];

    return structuredClone(newTodo);
  }

  async toggleTodo(id: string): Promise<ITodo> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const todoIndex = todosMock.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    todosMock[todoIndex].completed = !todosMock[todoIndex].completed;

    return structuredClone(todosMock[todoIndex]);
  }
}
