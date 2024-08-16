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
import { plugin } from "./setup";

const app = new Elysia()

  .use(cors())
  .use(swagger())
  .use(bearer())
  .use(serverTiming())

  // error handlers
  .error({ GlobalError })
  .onError(({ code, error, set }) => {
    switch (code) {
      case "NOT_FOUND":
        set.status = 404;
        return {
          code: 1909,
          message: "Not Found :(",
          timestamp: moment().format(),
        };
      case "GlobalError":
        set.status = 417;
        return {
          code: 1669,
          message: error.message,
          timestamp: moment().format(),
        };
      case "INTERNAL_SERVER_ERROR":
        set.status = 417;
        return {
          code: 10001,
          message: "Not Found :(",
          timestamp: moment().format(),
        } as ResponseError;
      default:
        set.status = 417;
        return {
          code: 10001,
          message: "Not Found :(",
          timestamp: moment().format(),
        } as ResponseError;
    }
  })

  // route handleer
  .use(authController)
  .use(userController)

  // initial server
  .listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
