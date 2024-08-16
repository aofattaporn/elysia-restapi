import { Elysia, t } from "elysia";
import userService from "../services/user";
import { CommonResponseSchema } from "../models/response/commonRes";
import { STATUS_CODE_1000, SUCCESS } from "../constants/common";
import { UserAccountSchema } from "../models/user";
import { Auth } from "../models/auth";
import jwt from "@elysiajs/jwt";

const authController = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: "Fischl von Luftschloss Narfidort",
    })
  )
  .post(
    "/register",
    ({ body }) => {
      const cred = body;

      if (cred.email && cred.password) {
      }

      const users: Auth[] = userService.findUserByEmail(cred);
      if (users.length > 0) {
      }

      userService.createUser(cred);

      return {
        code: STATUS_CODE_1000,
        description: SUCCESS,
        data: null,
      };
    },
    {
      body: UserAccountSchema,
      response: CommonResponseSchema(t.Null()),
    }
  )

  .post(
    "/sign-in",
    async ({ jwt, cookie: { auth }, body, params }) => {
      const cred = body;

      if (cred.email && cred.password) {
      }

      const isExist: boolean = userService.checkAuth(cred);
      if (!isExist) {
      }

      auth.set({
        value: await jwt.sign(params),
        httpOnly: true,
        maxAge: 7 * 86400,
        path: "/profile",
      });

      return {
        code: STATUS_CODE_1000,
        description: SUCCESS,
        data: null,
      };
    },
    {
      body: UserAccountSchema,
      response: CommonResponseSchema(t.Null()),
    }
  );

export default authController;
