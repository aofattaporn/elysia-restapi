import { t } from "elysia";

export type User = {
  username: string;
  email: string;
};

export const EUser = t.Object({
  username: t.String(),
  email: t.String(),
});

// export const convertTypeToElysia = <T extends Object>() => {
//   const elysiaSchema: Record<string, any> = {};

//   for (const key in T) {
//     const value = obj[key];

//     if (typeof value === "number") {
//       elysiaSchema[key] = t.Number();
//     } else if (typeof value === "string") {
//       elysiaSchema[key] = t.String();
//     } else if (typeof value === "boolean") {
//       elysiaSchema[key] = t.Boolean();
//     } else if (Array.isArray(value)) {
//       elysiaSchema[key] = t.Array(t.Any()); // You can refine this further
//     } else if (typeof value === "object" && value !== null) {
//       elysiaSchema[key] = convertTypeToElysia(value); // Recursive for nested objects
//     } else {
//       elysiaSchema[key] = t.Any();
//     }
//   }
// };
