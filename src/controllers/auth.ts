import { Elysia, t } from "elysia";
import userService from "../services/user";
import { CommonResponseSchema } from "../models/response/commonRes";
import {
  HTTP_STATUS_CODE_200,
  STATUS_CODE_1000,
  STATUS_CODE_1899,
  SUCCESS,
} from "../constants/common";
import { UserAccount, UserAccountSchema } from "../models/user";
import { plugin } from "../setup";
import jwt from "@elysiajs/jwt";
import GlobalError from "../errors/globalError";
import AuthError from "../errors/authError";

const authController = new Elysia({ prefix: "/auth" })
  .use(plugin)
  .use(
    jwt({
      secret: "jwt-secrets",
    })
  )
  .post(
    "/register",
    async ({ plugin, body, set }) => {
      plugin.logger.logInfoStartProcess("start on POST:auth/registe");

      const cred = body;
      plugin.logger.logInfo("check user require parameter");
      if (!(cred.email && cred.password && cred.username)) {
        plugin.logger.logInfo("already user in database");
        throw new GlobalError(STATUS_CODE_1899, "missing parameter for action");
      }

      plugin.logger.logInfo("check user already exist");
      const users: UserAccount[] = await userService.findUserByEmail(cred);
      if (users.length > 0) {
        plugin.logger.logInfo("already user in database, can't to register");
        throw new AuthError(
          STATUS_CODE_1899,
          "unauthorized, user already existing"
        );
      }

      plugin.logger.logInfo("save user on database");
      userService.createUser(cred);

      set.status = HTTP_STATUS_CODE_200;
      plugin.logger.logInfo("/register request success\n");
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
    "/login",
    async ({ jwt, plugin, cookie: { auth }, body, set }) => {
      plugin.logger.logInfoStartProcess("start on POST:auth/login");

      const cred = body;
      plugin.logger.logInfo("check user require parameter");
      if (!(cred.email && cred.password && cred.username)) {
        plugin.logger.logInfo("already user in database");
        throw new GlobalError(STATUS_CODE_1899, "missing parameter for action");
      }

      plugin.logger.logInfo("check user already exist");
      const users: UserAccount[] =
        await userService.checkEmailAndPassword(cred);
      if (!users.length) {
        plugin.logger.logInfo("already user in database");
        throw new AuthError(1899, "unauthorized");
      }

      plugin.logger.logInfo("generate jwt token and attach");
      auth.set({
        value: await jwt.sign(users[0]),
        httpOnly: true,
        maxAge: 7 * 86400,
        path: "/",
      });

      set.status = HTTP_STATUS_CODE_200;
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
