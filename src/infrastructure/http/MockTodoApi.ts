import type { ITodoApi } from './models';
import type { ITodoEntity } from './models/ITodoEntity';

let todosMock: ITodoEntity[] = [
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

// function simulateDelay(ms: number = 500) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export class MockTodoApi implements ITodoApi {
  async getTodos(): Promise<ITodoEntity[]> {
    // await simulateDelay();

    return structuredClone(todosMock);
  }

  async getTodoById(id: string): Promise<ITodoEntity | null> {
    // await simulateDelay();

    const todo = todosMock.find((todo) => todo.id === id);

    if (!todo) return null;

    return structuredClone(todo);
  }

  async createTodo(title: string): Promise<ITodoEntity> {
    //  await simulateDelay();

    const newTodo: ITodoEntity = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      created_at: new Date().toISOString(),
    };

    todosMock = [newTodo, ...todosMock];

    return structuredClone(newTodo);
  }

  async toggleTodo(id: string): Promise<ITodoEntity> {
    // await simulateDelay();

    const todoIndex = todosMock.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    todosMock[todoIndex].completed = !todosMock[todoIndex].completed;

    return structuredClone(todosMock[todoIndex]);
  }
}
