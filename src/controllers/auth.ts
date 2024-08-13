import Elysia from "elysia";

const authController = new Elysia({ prefix: "/auth" })
  .post("/sign-in", () => "Sign in")
  .post("/sign-up", () => "Sign up")
  .post("/profile", () => "Profile");

export default authController;
