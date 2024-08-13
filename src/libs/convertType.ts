import { t, TSchema } from "elysia";

export const convertTypeToElysia = <T>(obj: T): TSchema => {
  const elysiaSchema: Record<string, any> = {};

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "number") {
      elysiaSchema[key] = t.Number();
    } else if (typeof value === "string") {
      elysiaSchema[key] = t.String();
    } else if (typeof value === "boolean") {
      elysiaSchema[key] = t.Boolean();
    } else if (Array.isArray(value)) {
      elysiaSchema[key] = t.Array(t.Any()); // You can refine this further
    } else if (typeof value === "object" && value !== null) {
      elysiaSchema[key] = convertTypeToElysia(value); // Recursive for nested objects
    } else {
      elysiaSchema[key] = t.Any();
    }
  }

  return t.Object(elysiaSchema);
};

// Usage example
export type TestObject = {
  name: number;
  age: number;
  isActive: boolean;
  tags: string[];
  metadata: {
    createdAt: string;
  };
};

const TUser = convertTypeToElysia<TestObject>({
  name: 0,
  age: 0,
  isActive: true,
  tags: [],
  metadata: {
    createdAt: "",
  },
});

console.log(TUser);
