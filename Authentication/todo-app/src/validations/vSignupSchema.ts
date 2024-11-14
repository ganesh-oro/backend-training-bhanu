import { object,string, pipe, minLength, maxLength, email, type InferOutput} from "valibot";

export const SignupSchema = object({
    fullName:pipe(string(),minLength(3),maxLength(12)),
    email:pipe(string(),email()),
    password:pipe(string(),minLength(8)),
    phone:pipe(string(),minLength(10),maxLength(10))
})

export type SignupData = InferOutput<typeof SignupSchema>;