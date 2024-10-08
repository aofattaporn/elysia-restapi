import { Elysia, t } from "elysia";
import authController from "./controllers/auth";
import userController from "./controllers/user";
import bearer from "@elysiajs/bearer";
import cors from "@elysiajs/cors";
import serverTiming from "@elysiajs/server-timing";
import swagger from "@elysiajs/swagger";
import errorHandler from "./errors/errorhandlers";
import userService from "./services/user";
import AuthError from "./errors/authError";
import jwt from "@elysiajs/jwt";
import { STATUS_CODE_1799 } from "./constants/common";
import documentation from "./plugins/documentation";
import cordConfigs from "./plugins/cors";

export const app = new Elysia()

  .use(serverTiming())
  .use(bearer())
  .use(cordConfigs)
  .use(documentation)

  // initial database
  .onBeforeHandle(() => userService.initialDB())

  // error handlers - global scope plugins
  .use(errorHandler)

  // route handleer
  .get("/hello", "Helloworld", { response: t.String() })
  .use(authController)
  .use(
    jwt({
      secret: "jwt-secrets",
    })
  )
  .onBeforeHandle(async ({ jwt, cookie: { auth }, path }) => {
    const cred = await jwt.verify(auth.value);
    if (!cred && !path.includes("/swagger"))
      throw new AuthError(STATUS_CODE_1799, "Unauthorization");
  })
  .use(userController)

  // initial server
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
