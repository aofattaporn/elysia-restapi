import Elysia from "elysia";
import AuthError from "../errors/authError";

const userController = new Elysia({ prefix: "/users" })
  .get("/", ({ set }) => {
    set.status = 200;
    throw new AuthError(401, 1200, "unauthorized");
    // return { test: "s" };
  })
  .get("/:id", () => {
    return {};
  })
  .post("/", () => {})
  .put("/", () => {});

export default userController;
