import type { DependencyContainer } from 'tsyringe';
import { container as globalContainer } from '@infrastructure/di/container';

export function useInjection<T>(token: string | symbol): T {
  // En un proyecto más grande podrías tener un contexto de container
  const c: DependencyContainer = globalContainer;
  return c.resolve<T>(token as any);
}
