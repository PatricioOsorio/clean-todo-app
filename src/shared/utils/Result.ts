export type IResult<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

export const ok = <T>(value: T): IResult<T> => ({ ok: true, value });
export const err = <E>(error: E): IResult<never, E> => ({ ok: false, error });

export const isOk = <T, E = Error>(result: IResult<T, E>): result is { ok: true; value: T } => result.ok;
