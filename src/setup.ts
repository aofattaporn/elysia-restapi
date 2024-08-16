import Elysia from "elysia";
import Logger from "./plugins/logger";
import jwt from "@elysiajs/jwt";

export const plugin = new Elysia().decorate("plugin", {
  logger: new Logger(),
});
