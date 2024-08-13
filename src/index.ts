import { Elysia, t } from "elysia";
import authController from "./controllers/auth";
import userController from "./controllers/user";

const app = new Elysia()

  // before handlering
  .onBeforeHandle(() => {})

  // use seperate prefix instance
  .use(authController)
  .use(userController)

  // error route for not found
  .onError(({ code }) => {
    if (code === "NOT_FOUND") return "Route not found :(";
  })

  // initial server
  .listen(Number(Bun.env.PORT));

// Testing API Request
app.handle(new Request("http://localhost/users")).then((res: Response) => {
  console.log(res);
});
