import { object, type InferOutput} from 'valibot'
import { PasswordSchema } from './vPasswordSchema.ts';
import { EmailSchema } from './vEmailSchema.ts';

export const LoginSchema = object({
    email: EmailSchema,
    password: PasswordSchema,
  });

export type LoginData = InferOutput<typeof LoginSchema>;