import { object,string, pipe, minLength, maxLength, email, type InferOutput, regex} from "valibot";
import { EmailSchema } from "./vEmailSchema.ts";
import { PasswordSchema } from "./vPasswordSchema.ts";

export const SignupSchema = object({
    fullName:pipe(string(),minLength(3),maxLength(12)),
    email:EmailSchema,
    password:PasswordSchema,
    phone:pipe(string(),minLength(10),maxLength(10))
})

export type SignupData = InferOutput<typeof SignupSchema>;