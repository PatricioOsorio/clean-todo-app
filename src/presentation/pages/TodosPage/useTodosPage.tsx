import { CreateTodoUseCase, GetTodosUseCase, ToggleTodoUseCase } from '@/application/usecases';
import { useEffect, useState } from 'react';
import { useInjection } from '@/shared/hooks/useInjection';
import { mapTodosToUI, mapTodoToUI } from '@/presentation/mappers';
import type { ITodoUI } from '@/presentation/models';

export const useTodosPage = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<ITodoUI[]>([]);
  const [loading, setLoading] = useState(false);

  const getTodosUseCase = useInjection(GetTodosUseCase);
  const toggleTodoUseCase = useInjection(ToggleTodoUseCase);
  const createTodoUseCase = useInjection(CreateTodoUseCase);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const todosDomain = await getTodosUseCase.execute();

      setTodos(mapTodosToUI(todosDomain));
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleToggleTodo = async (id: string) => {
    try {
      await toggleTodoUseCase.execute(id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
      );
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleAddTodo = async () => {
    if (!value.trim()) return;

    try {
      const createdDomain = await createTodoUseCase.execute({ title: value });

      setTodos((prev) => [mapTodoToUI(createdDomain), ...prev]);
      setValue('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
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
