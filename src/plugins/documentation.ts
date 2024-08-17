import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

const documentation = new Elysia().use(
  swagger({
    documentation: {
      info: {
        title: "Elysia Documentation",
        version: "1.0.0",
      },
      tags: [
        { name: "Auth", description: "Authentication endpoints" },
        { name: "Users", description: "UserManagement endpoints" },
      ],
    },
  })
);

export default documentation;
