import './TodoList.scss';
import { classNames } from 'primereact/utils';
import { Todo } from '../Todo/Todo';
import type { ITodoListProps } from './TodoList.interface';

export const TodoList = ({ todos, isLoading, onToggleTodo, btnToggleProps, ...props }: ITodoListProps) => {
  if (isLoading) {
    return <section {...props}>Loading...</section>;
  }

  if (todos.length === 0) {
    return <section {...props}>No todos found.</section>;
  }

  return (
    <section {...props} className={classNames('todo-list-container', props.className)}>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          title={todo.title}
          completed={todo.completed}
          btnToggleProps={{
            ...btnToggleProps,
            onClick: (e) => {
              onToggleTodo?.(todo.id);
              btnToggleProps?.onClick?.(e);
            },
          }}
        />
      ))}
    </section>
  );
};
