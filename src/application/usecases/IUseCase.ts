import type { IResult } from "@/shared/utils";

export interface IUseCase<Input, Output> {
  execute(input: Input): Promise<IResult<Output>>;
}
