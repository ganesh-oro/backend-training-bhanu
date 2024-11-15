import { flatten, safeParse } from "valibot";
import UnproccesableEntityException from "../exceptions/unproccesbleEntityException.ts";



export const validate = async (schema:any, data: any) => {
    
    const validatedData = safeParse(schema, data, { abortPipeEarly: true });

    if (validatedData.success) {
        return validatedData.output;
    }
    else {
       const errorData = flatten(validatedData.issues);
       throw new UnproccesableEntityException('validation failed',errorData.nested);
    }
}