import { t } from "elysia";

export type UserAccount = {
  email: string;
  username: string;
  password: string;
};

export const UserAccountSchema = t.Object({
  email: t.String(),
  username: t.String(),
  password: t.String(),
});

export const UserAccountResSchema = t.Object({
  email: t.String(),
  username: t.String(),
});
