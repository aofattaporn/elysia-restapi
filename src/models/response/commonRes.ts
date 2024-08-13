import { t } from "elysia";

export interface CommonResponse<T> {
  code: number;
  description: string;
  data?: T;
}

export const ECommonResponse = {
  code: t.Number(),
  description: t.String(),
  data: t.Object,
};
