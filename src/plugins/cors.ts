import cors from "@elysiajs/cors";
import { Elysia } from "elysia";

const cordConfigs = new Elysia().use(
  cors({
    origin: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true,
    maxAge: 5,
  })
);

export default cordConfigs;
