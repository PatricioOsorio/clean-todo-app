import type { ITodoApi } from './models';
import type { ITodoEntity } from './models/ITodoEntity';

const STORAGE_KEY = 'todos_mock_local';

function loadTodos(): ITodoEntity[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ITodoEntity[];
  } catch {
    console.warn('Invalid localStorage data for todos, resetting...');
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

// function simulateDelay(ms: number = 500) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

function saveTodos(todos: ITodoEntity[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export class MockTodoApiLocalStorage implements ITodoApi {
  async getTodos(): Promise<ITodoEntity[]> {
    // await simulateDelay();
    return structuredClone(loadTodos());
  }

  async getTodoById(id: string): Promise<ITodoEntity | null> {
    // await simulateDelay();

    const todos = loadTodos();
    const todo = todos.find((t) => t.id === id);

    if (!todo) return null;
    return structuredClone(todo);
  }

  async createTodo(title: string): Promise<ITodoEntity> {
    // await simulateDelay();

    const todos = loadTodos();

    const newTodo: ITodoEntity = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      created_at: new Date().toISOString(),
    };

    const updated = [newTodo, ...todos];
    saveTodos(updated);

    return structuredClone(newTodo);
  }

  async toggleTodo(id: string): Promise<ITodoEntity> {
    // await simulateDelay();

    const todos = loadTodos();
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new Error('Todo not found');
    }

    todos[index].completed = !todos[index].completed;

    saveTodos(todos);

    return structuredClone(todos[index]);
  }
}
