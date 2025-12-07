import type { IResult } from '@/shared/utils';

export interface IUseCase<Input = void, Output = void> {
  execute(input: Input): Promise<IResult<Output>>;
}
