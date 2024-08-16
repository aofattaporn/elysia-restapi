import Elysia from "elysia";
import Logger from "./plugins/logger";

export const plugin = new Elysia().decorate("plugin", {
  logger: new Logger(),
});
