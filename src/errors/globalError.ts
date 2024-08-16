import { error } from "elysia";

class GlobalError extends Error {
  constructor(
    public code: number,
    public message: string
  ) {
    super(message);
  }
}

export default GlobalError;
