import { object,string, pipe, minLength, maxLength, email, type InferOutput, regex, config} from "valibot";
import { EmailSchema } from "./vEmailSchema.ts";
import { PasswordSchema } from "./vPasswordSchema.ts";

export const SignupSchema = object({
    fullName:config(pipe(string(),minLength(3),maxLength(30)),{ abortPipeEarly: true }),
    email:EmailSchema,
    password:PasswordSchema,
    phone:config(pipe(string(),minLength(10),maxLength(10)),{ abortPipeEarly: true })
})

export type SignupData = InferOutput<typeof SignupSchema>;