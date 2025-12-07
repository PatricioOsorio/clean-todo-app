import { CreateTodoUseCase, GetTodosUseCase, ToggleTodoUseCase } from '@/application/usecases';
import { mapTodosToUI, mapTodoToUI } from '@/presentation/mappers';
import { useEffect, useState } from 'react';
import type { ITodoUI } from '@/presentation/models';
import { useInjection } from '@/app/di';

export const useTodosPage = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<ITodoUI[]>([]);
  const [loading, setLoading] = useState(false);

  const getTodosUseCase = useInjection(GetTodosUseCase);
  const toggleTodoUseCase = useInjection(ToggleTodoUseCase);
  const createTodoUseCase = useInjection(CreateTodoUseCase);

  const fetchTodos = async () => {
    setLoading(true);

    const result = await getTodosUseCase.execute();

    if (result.ok) {
      const todosDomain = result.value;
      setTodos(mapTodosToUI(todosDomain));
    } else {
      console.error(result.error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleToggleTodo = async (id: string) => {
    const result = await toggleTodoUseCase.execute(id);

    if (!result.ok) {
      console.error(result.error);
      return;
    }

    const toggledDomain = result.value;
    const toggledUI = mapTodoToUI(toggledDomain);

    setTodos((prev) => prev.map((t) => (t.id === id ? toggledUI : t)));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleAddTodo = async () => {
    if (!value.trim()) return;

    const result = await createTodoUseCase.execute({ title: value });

    if (!result.ok) {
      console.error(result.error);
      return;
    }

    const createdDomain = result.value;
    const createdUI = mapTodoToUI(createdDomain);

    setTodos((prev) => [createdUI, ...prev]);
    setValue('');
  };

  return {
    // States
    value,
    todos,
    loading,

    // Handlers
    handleChangeInput,
    handleAddTodo,
    handleToggleTodo,
  };
};
