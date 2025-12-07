import type { ITodoUI } from '@/presentation/models';
import type { ButtonProps } from 'primereact/button';
import type { ComponentPropsWithoutRef } from 'react';

export interface ITodoProps extends ComponentPropsWithoutRef<'section'>, Pick<ITodoUI, 'completed'> {
  title?: ITodoUI['title'];
  btnToggleProps?: ButtonProps;
}
