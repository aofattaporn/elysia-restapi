import Elysia from "elysia";
import userApi from "../services/user";
import GlobalError from "../errors/globalError";

const userController = new Elysia({ prefix: "/users" })
  .get("/:id", () => {
    return {};
  })
  .get("/", ({ set }) => {
    set.status = 200;
    throw new GlobalError(1000, "asdasdasdasdasd");
    // return { test: "s" };
  })
  .post("/", () => {})
  .put("/", () => {});

export default userController;
