import Elysia from "elysia";
import userApi from "../services/user";

const userController = new Elysia({ prefix: "/users" })
  .get("/:id", () => {})
  .get("/", () => {})
  .post("/", () => {})
  .put("/", () => {});

export default userController;
