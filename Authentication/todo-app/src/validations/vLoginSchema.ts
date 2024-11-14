import {email, minLength, object, pipe, string, type InferOutput} from 'valibot'

export const LoginSchema = object({
    email: pipe(string(), email()),
    password: pipe(string(), minLength(8)),
  });

  export type LoginData = InferOutput<typeof LoginSchema>;