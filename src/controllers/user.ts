import Elysia from "elysia";
import AuthError from "../errors/authError";

const userController = new Elysia({ prefix: "/users" })
  .get("/", ({ set }) => {
    set.status = 200;
    // return { test: "s" };
  })
  .get("/:id", () => {
    return {};
  })
  .post("/", () => {})
  .put("/", () => {});

export default userController;
