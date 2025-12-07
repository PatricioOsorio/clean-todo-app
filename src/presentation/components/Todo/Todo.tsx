import type { ITodoProps } from './Todo.interface';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import './Todo.scss';

export const Todo = ({ title, completed, btnToggleProps, ...props }: ITodoProps) => {
  return (
    <section {...props} className={classNames('todo-container', props.className)}>
      <h2 className="tc__title">{title}</h2>
      <div className="tc__end">
        <p className="tc__status">{completed ? 'Completed' : 'Not Completed'}</p>
        <Button
          label="Toggle Complete"
          {...btnToggleProps}
          className={classNames('tc__toggle', btnToggleProps?.className)}
        />
      </div>
    </section>
  );
};
