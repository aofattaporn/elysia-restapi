import Elysia from "elysia";
import moment from "moment";
import {
  HTTP_STATUS_CODE_404,
  STATUS_CODE_9999,
  REQUEST_NOT_FOUND,
  HTTP_STATUS_CODE_500,
  STATUS_CODE_1999,
  INTERNAL_SERVER_ERROR,
} from "../constants/common";
import { ResponseError } from "../models/response/errorRes";
import GlobalError from "./globalError";
import AuthError from "./authError";
import { plugin } from "../setup";

const errorHandler = new Elysia()
  .use(plugin)
  .error({ GlobalError, AuthError })
  .onError({ as: "scoped" }, ({ plugin, code, error, set }) => {
    plugin.logger.logError(error.message);
    plugin.logger.logInfoEndingProcess("end of processing");
    switch (code) {
      case "NOT_FOUND":
        set.status = HTTP_STATUS_CODE_404;
        return {
          code: STATUS_CODE_9999,
          message: REQUEST_NOT_FOUND,
          timestamp: moment().format(),
        };
      case "VALIDATION":
        return {
          code: 422,
          message: "missing reqire parameters",
          timestamp: moment().format(),
        };
      case "GlobalError":
        return {
          code: error.cause as Number,
          message: error.message,
          timestamp: moment().format(),
        };
      case "AuthError":
        set.status = 401;
        return {
          code: error.cause as Number,
          message: error.message,
          timestamp: moment().format(),
        };

      default:
        plugin.logger.logFaltal(error.message);
        set.status = HTTP_STATUS_CODE_500;
        return {
          code: STATUS_CODE_1999,
          message: INTERNAL_SERVER_ERROR,
          timestamp: moment().format(),
        } as ResponseError;
    }
  });

export default errorHandler;
