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

const app = new Elysia()

  .use(cors())
  .use(swagger())
  .use(bearer())
  .use(serverTiming())

  // initial database
  .onBeforeHandle(() => userService.initialDatabe())

  // error handlers - global scope plugins
  .use(errorHandler)

  // route handleer
  .use(authController)
  .use(
    jwt({
      secret: "jwt-secrets",
    })
  )
  .onBeforeHandle(async ({ jwt, cookie: { auth } }) => {
    const cred = await jwt.verify(auth.value);
    if (!cred) throw new AuthError(STATUS_CODE_1799, "Unauthorization");
  })
  .use(userController)

  // initial server
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
