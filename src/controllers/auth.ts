import { Elysia } from "elysia";
import { EUser, User } from "../models/user";
import userService from "../services/user";
import { CommonResponse, ECommonResponse } from "../models/response/commonRes";

const authController = new Elysia({ prefix: "/auth" })

  .post(
    "/sign-in",
    ({ body }): CommonResponse<User> => {
      // calling service handler
      userService.createUser({ email: body.email, password: body.username });

      return {
        code: 1000,
        description: "get user success",
      } as CommonResponse<User>;
    },
    { body: EUser }
  )
  .post("/sign-up", () => "Sign up")
  .post("/profile", () => "Profile");

export default authController;
