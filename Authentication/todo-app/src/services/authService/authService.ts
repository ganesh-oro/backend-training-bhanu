import { db } from "../../db/dbConnection.ts"
import { users } from "../../db/schemas/user.ts";
import { eq } from 'drizzle-orm';

export const authservice = {
    addOne:async(body: any) => {
       return await db.insert(users).values({...body}).returning()
    },
    searchOne:async(email:string)=>{
        return await db.select().from(users).where(eq(users.email,email));
    },
    deleteOne:async(email:string)=>{
        return await db.delete(users).where(eq(users.email,email));
    },
    updateOne:async(email:string,body:any)=>{
        return await db.update(users).set({...body}).where(eq(users.email,email)).returning();
    },
    updatePassword:async(email:string,password:string)=>{
        return await db.update(users).set({password}).where(eq(users.email,email)).returning();
    },
}
