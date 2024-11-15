import { email, maxLength, nonEmpty, pipe, string, type InferOutput } from "valibot";

export const EmailSchema = pipe(
    string(),
    nonEmpty('Please enter your email'),
    email('Please enter a valid email'),
    maxLength(30,'Please enter a valid email')
)

export type EmailSchema = InferOutput<typeof EmailSchema>;