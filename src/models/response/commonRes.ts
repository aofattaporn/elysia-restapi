import { t, TSchema } from "elysia";

export interface CommonResponse<T> {
  code: number;
  description: string;
  data?: T;
}

export const CommonResponseSchema = <T extends TSchema>(T: T) =>
  t.Object({
    code: t.Number(),
    description: t.String(),
    data: t.Nullable(T),
  });
