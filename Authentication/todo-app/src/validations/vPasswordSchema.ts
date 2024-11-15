import { maxLength, minLength, pipe, regex, string, type InferOutput } from "valibot";

export const PasswordSchema = pipe(
    string(),
    minLength(8,'Your Password must be at least 8 characters long'),
    maxLength(15,'Your Password must be at most 10 characters long'),
    regex(/[A-Z]/,'Your Password must contain at least one uppercase letter'),
    regex(/[a-z]/,'Your Password must contain at least one lowercase letter'),
    regex(/[0-9]/,'Your Password must contain at least one number'),
)
export type PasswordSchema = InferOutput<typeof PasswordSchema>;