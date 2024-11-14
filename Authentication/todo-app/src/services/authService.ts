import type { Context } from "hono";
import { db } from "../db/dbConnection.ts"
import { users } from "../db/schemas/user.ts";
import {eq} from 'drizzle-orm';

export const authservice = {
    addOne:async(body: any) => {
       return await db.insert(users).values({...body}).returning()
    },
    searchOne:async(email:string)=>{
        return await db.select().from(users).where(eq(users.email,email));
    },
    // searchPassword:async(email:string)=>{
    //     const password2 = await db.select({password:users.password}).from(users).where(eq(users.email,email));        // const isPasswordMatch = await bcrypt.compare(password,password2);
    //     return password2;
        
    // },
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
