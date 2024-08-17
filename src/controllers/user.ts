import Elysia, { t } from "elysia";
import { CommonResponseSchema } from "../models/response/commonRes";
import { UserAccountResSchema } from "../models/user";
import { STATUS_CODE_1000, SUCCESS } from "../constants/common";
import userService from "../services/user";
import { plugin } from "../setup";
import { UserAccountRes } from "../models/response/userRes";

const userController = new Elysia({ prefix: "/users" })
  .use(plugin)
  .get(
    "/",
    async ({ plugin, set }) => {
      plugin.logger.logInfoStartProcess("start on GET: users/");

      plugin.logger.logInfo("find users in database");
      const users: UserAccountRes[] = await userService.findAll();

      plugin.logger.logInfoEndingProcess("request successfully");
      set.status = 200;
      return {
        code: STATUS_CODE_1000,
        description: SUCCESS,
        data: users,
      };
    },
    {
      response: CommonResponseSchema(t.Array(UserAccountResSchema)),
      detail: {
        tags: ["Users"],
      },
    }
  )
  .get(
    "/:id",
    async ({ plugin, params: { id }, set }) => {
      plugin.logger.logInfoStartProcess("start on GET: users/:id");

      plugin.logger.logInfo(`find users by id:${id} in database`);
      const users: UserAccountRes = await userService.findById(id);

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
      response: CommonResponseSchema(UserAccountResSchema),
      detail: {
        tags: ["Users"],
      },
    }
  )
  .delete(
    "/",
    async ({ plugin, set }) => {
      plugin.logger.logInfoStartProcess("start on DELETE: users/");

      plugin.logger.logInfo(`delete all users in database`);
      await userService.deleteAll();

      plugin.logger.logInfoEndingProcess("request successfully");
      set.status = 200;
      return {
        code: STATUS_CODE_1000,
        description: SUCCESS,
        data: null,
      };
    },
    {
      response: CommonResponseSchema(t.Null()),
      detail: {
        tags: ["Users"],
      },
    }
  )

  .put("/", () => {});

export default userController;
