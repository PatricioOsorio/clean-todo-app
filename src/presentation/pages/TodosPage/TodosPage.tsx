import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { TodoList } from '@/presentation/components/TodoList';
import { useTodosPage } from './useTodosPage';
import './TodosPage.scss';

export const TodosPage = () => {
  const {
    // States
    value,
    todos,
    loading,

    // Handlers
    handleChangeInput,
    handleAddTodo,
    handleToggleTodo,
  } = useTodosPage();

  return (
    <article className="todos-page">
      <h1>Todos Page</h1>

      <section className="tp__form">
        <InputText value={value} onChange={handleChangeInput} />
        <Button label="Add Todo" onClick={handleAddTodo} />
      </section>

      <section className="tp__list">
        <TodoList todos={todos} onToggleTodo={handleToggleTodo} isLoading={loading} />
      </section>
    </article>
  );
};
