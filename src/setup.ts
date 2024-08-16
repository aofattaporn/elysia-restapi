import Elysia from "elysia";
import Logger from "./plugins/logger";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Database } from "bun:sqlite";
import jwt from "@elysiajs/jwt";
import bearer from "@elysiajs/bearer";

export const setup = new Elysia({ name: "setup" })
  .use(cors())
  .use(swagger())
  .use(bearer())
  .use(
    jwt({
      name: "jwt",
      secret: "Fischl von Luftschloss Narfidort",
    })
  )
  .decorate({
    logger: new Logger(),
    database: new Database(),
  });
