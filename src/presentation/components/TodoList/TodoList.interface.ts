import type { ITodoUI } from '@/presentation/models';
import type { ButtonProps } from 'primereact/button';
import type { ComponentPropsWithRef } from 'react';

export interface ITodoListProps extends ComponentPropsWithRef<'section'> {
  todos: ITodoUI[];
  isLoading?: boolean;
  onToggleTodo?: (id: string) => void;
  btnToggleProps?: ButtonProps;
}
