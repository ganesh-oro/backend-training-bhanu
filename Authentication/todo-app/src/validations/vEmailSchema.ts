import { config, email, maxLength, nonEmpty, pipe, string, type InferOutput } from "valibot";

export const EmailSchema = config(pipe(
    string(),
    nonEmpty('Please enter your email'),
    email('Please enter a valid email'),
    maxLength(30,'Please enter a valid email')),
    { abortPipeEarly: true }
)

export type EmailSchema = InferOutput<typeof EmailSchema>;