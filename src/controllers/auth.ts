import { Elysia, t } from "elysia";
import userService from "../services/user";
import { CommonResponseSchema } from "../models/response/commonRes";
import { STATUS_CODE_1000, SUCCESS } from "../constants/common";
import { UserAccountSchema } from "../models/user";
import { Auth } from "../models/auth";
import { plugin } from "../setup";
import jwt from "@elysiajs/jwt";

const authController = new Elysia({ prefix: "/auth" })
  .use(plugin)
  .use(
    jwt({
      secret: "a",
    })
  )
  .post(
    "/register",
    ({ plugin, body }) => {
      const cred = body;

      plugin.logger.logInfo("check user require parameter");
      if (cred.email && cred.password) {
      }

      plugin.logger.logInfo("check user already exist");
      const users: Auth[] = userService.findUserByEmail(cred);
      if (users.length > 0) {
      }

      plugin.logger.logInfo("save user on database");
      userService.createUser(cred);

      plugin.logger.logInfo("/register request success");
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
    async ({ jwt, plugin, cookie: { auth }, body, params }) => {
      const cred = body;

      plugin.logger.logInfo("check user require parameter");
      if (cred.email && cred.password) {
      }

      plugin.logger.logInfo("check user already exist");
      const isExist: boolean = userService.checkAuth(cred);
      if (!isExist) {
      }

      plugin.logger.logInfo("generate jwt token and attach");
      auth.set({
        value: await jwt.sign(params),
        httpOnly: true,
        maxAge: 7 * 86400,
        path: "/",
      });

      plugin.logger.logInfo("/sign-in request success");
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
