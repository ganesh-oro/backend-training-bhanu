import { object, pipe, string, minLength, maxLength, type InferOutput } from "valibot";

export const TaskSchema = object({
    title:pipe(string(),minLength(3),maxLength(100)),
    description:pipe(string(),minLength(3),maxLength(1000))
})


export type TaskSchema = InferOutput<typeof TaskSchema>