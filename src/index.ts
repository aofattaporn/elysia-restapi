import { Elysia } from "elysia";
import authApi from "./controllers/auth";

const app = new Elysia()

  // before handlering
  .onBeforeHandle(() => {})

  // route handlering
  .group("/auth", (app) => {
    return app
      .get("/", authApi.handleSignIn)
      .post("/sign-in", authApi.handleSignIn)
      .put("/sign-up", authApi.handleSignIn);
  })
  .group("/user", (user) => {
    return user
      .get("/", authApi.handleSignIn)
      .post("/", () => {})
      .put("/", () => {});
  })

  // error route for not found
  .onError(({ code }) => {
    if (code === "NOT_FOUND") return "Route not found :(";
  })

  // initial server
  .listen(3000);

app.handle(new Request("http://localhost/auth")).then((res: Response) => {
  console.log(res);
});
