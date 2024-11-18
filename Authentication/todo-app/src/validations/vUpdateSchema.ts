// import { object, pipe, string, minLength, maxLength, type InferOutput, nullable, optional } from "valibot";
// import { EmailSchema } from "./vEmailSchema.ts";
// import { PasswordSchema } from "./vPasswordSchema.ts";

// export const updateProfileSchema = object({
//     fullName:pipe(nullable(string())),
//     email:EmailSchema,
//     password:PasswordSchema,
//     phone:pipe(string(),minLength(10),maxLength(10))
// })

// export type updateProfileSchema = InferOutput<typeof updateProfileSchema>;