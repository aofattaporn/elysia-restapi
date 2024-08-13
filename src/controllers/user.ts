import Elysia from "elysia";
import userApi from "../handlers/user";

const userController = new Elysia({ prefix: "/users" })
  .get("/:id", () => {})
  .get("/", userApi.getAllUsers)
  .post("/", userApi.createUser)
  .put("/", userApi.updateUserById);

export default userController;
