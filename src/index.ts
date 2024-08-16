import { Elysia, t } from "elysia";
import authController from "./controllers/auth";
import userController from "./controllers/user";
import bearer from "@elysiajs/bearer";
import cors from "@elysiajs/cors";
import serverTiming from "@elysiajs/server-timing";
import swagger from "@elysiajs/swagger";

const app = new Elysia()

  .use(cors())
  .use(swagger())
  .use(bearer())
  .use(serverTiming())

  .use(authController)
  .use(userController)

  .onError(({ code }) => {
    if (code === "NOT_FOUND") return "Route not found :(";
  })

  // initial server
  .listen(Number(Bun.env.PORT) || 3000);

// Testing API Request
app.handle(new Request("http://localhost/users")).then((res: Response) => {
  console.log(res);
});
