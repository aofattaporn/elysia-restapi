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

const errorHandler = new Elysia()
  .error({ GlobalError })
  .onError({ as: "scoped" }, ({ code, error, set }) => {
    switch (code) {
      case "NOT_FOUND":
        set.status = HTTP_STATUS_CODE_404;
        return {
          code: STATUS_CODE_9999,
          message: REQUEST_NOT_FOUND,
          timestamp: moment().format(),
        };
      case "GlobalError":
        set.status = error.status;
        return {
          code: error.code,
          message: error.message,
          timestamp: moment().format(),
        };
      default:
        set.status = HTTP_STATUS_CODE_500;
        return {
          code: STATUS_CODE_1999,
          message: INTERNAL_SERVER_ERROR,
          timestamp: moment().format(),
        } as ResponseError;
    }
  });

export default errorHandler;
