import Elysia from "elysia";
import Logger from "./plugins/logger";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import jwt from "@elysiajs/jwt";
import bearer from "@elysiajs/bearer";
import serverTiming from "@elysiajs/server-timing";

export const setup = new Elysia({ name: "setup" })
  .use(cors())
  .use(swagger())
  .use(bearer())
  .use(serverTiming())
  .use(
    jwt({
      name: "jwt",
      secret: "Fischl von Luftschloss Narfidort",
    })
  )

  // internal logger plugins
  .decorate({
    logger: new Logger(),
  });
