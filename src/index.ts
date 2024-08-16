import { Elysia, t } from "elysia";
import authController from "./controllers/auth";
import userController from "./controllers/user";
import bearer from "@elysiajs/bearer";
import cors from "@elysiajs/cors";
import serverTiming from "@elysiajs/server-timing";
import swagger from "@elysiajs/swagger";
import GlobalError from "./errors/globalError";
import moment from "moment";
import { ResponseError } from "./models/response/errorRes";
import {
  HTTP_STATUS_CODE_404,
  HTTP_STATUS_CODE_500,
  INTERNAL_SERVER_ERROR,
  REQUEST_NOT_FOUND,
  STATUS_CODE_1999,
  STATUS_CODE_9999,
} from "./constants/common";
import errorHandler from "./errors/errorhandlers";
import { plugin } from "./setup";

const app = new Elysia()

  .use(cors())
  .use(swagger())
  .use(bearer())
  .use(serverTiming())

  // error handlers - global scope plugins
  .use(errorHandler)

  // route handleer
  .use(authController)
  .use(userController)

  // initial server
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
