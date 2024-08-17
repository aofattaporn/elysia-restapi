import Elysia, { t } from "elysia";
import AuthError from "../errors/authError";
import { CommonResponseSchema } from "../models/response/commonRes";
import { UserAccount, UserAccountSchema } from "../models/user";
import { STATUS_CODE_1000, SUCCESS } from "../constants/common";
import userService from "../services/user";
import { plugin } from "../setup";

const userController = new Elysia({ prefix: "/users" })
  .use(plugin)
  .get(
    "/",
    async ({ plugin, set }) => {
      plugin.logger.logInfoStartProcess("start on GET: users/");

      plugin.logger.logInfo("find users in database");
      const users: UserAccount[] = await userService.findAll();

      plugin.logger.logInfoEndingProcess("request successfully");
      set.status = 200;
      return {
        code: STATUS_CODE_1000,
        description: SUCCESS,
        data: users,
      };
    },
    {
      response: CommonResponseSchema(t.Array(UserAccountSchema)),
    }
  )
  .get(
    "/:id",
    async ({ plugin, params: { id }, set }) => {
      plugin.logger.logInfoStartProcess("start on GET: users/:id");

      plugin.logger.logInfo(`find users by id:${id} in database`);
      const users: UserAccount = await userService.findById(id);

      plugin.logger.logInfoEndingProcess("request successfully");
      set.status = 200;
      return {
        code: STATUS_CODE_1000,
        description: SUCCESS,
        data: users,
      };
    },
    {
      params: t.Object({ id: t.Number() }),
      response: CommonResponseSchema(UserAccountSchema),
    }
  )

  .put("/", () => {});

export default userController;
