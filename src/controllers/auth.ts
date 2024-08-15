import { Elysia, error } from "elysia";
import userService from "../services/user";
import { CommonResponse } from "../models/response/commonRes";
import { STATUS_CODE_1000 } from "../constants/common";
import { UserAccountSchema } from "../models/user";
import { Auth } from "../models/auth";

const authController = new Elysia({ prefix: "/auth" })

  .post(
    "/sign-up",
    ({ body }): CommonResponse<null> => {
      const cred: Auth = body;

      if (!cred.email || !cred.password) {
        // force return error
      }

      const users: Auth[] = userService.findUserByEmail(cred);
      if (users.length > 0) {
        // force return error
      }

      userService.createUser(cred);

      return {
        code: STATUS_CODE_1000,
        description: "get user success",
      } as CommonResponse<null>;
    },
    { body: UserAccountSchema }
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
