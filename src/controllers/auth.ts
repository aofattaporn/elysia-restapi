import { Elysia, error, t } from "elysia";
import userService from "../services/user";
import {
  CommonResponse,
  CommonResponseSchema,
} from "../models/response/commonRes";
import { STATUS_CODE_1000 } from "../constants/common";
import { UserAccountSchema } from "../models/user";
import { Auth } from "../models/auth";

const authController = new Elysia({ prefix: "/auth" })

  .post(
    "/sign-up",
    ({ body }) => {
      const cred = body;

      if (cred.email && cred.password) {
      }

      const users: Auth[] = userService.findUserByEmail(cred);
      if (users.length) {
      }

      userService.createUser(cred);

      return {
        code: 1,
        description: "",
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
    ({ body }): CommonResponse<null> => {
      userService.createUser({ email: body.email, password: body.username });

      return {
        code: STATUS_CODE_1000,
        description: "get user success",
      } as CommonResponse<null>;
    },
    { body: UserAccountSchema }
  );

export default authController;
