import type { Context } from "hono";
import { tasks } from "../db/schemas/schema.ts";
import { db } from "../db/dbConnection.ts";
import { user } from "../db/schemas/user.ts";
import { eq } from "drizzle-orm";

export const TaskService = {
    getAll:function(){
        return db.select().from(tasks).execute();
    },
    addOne: async(data:any)=>{
        return await db.insert(tasks).values(data).returning();
    },
    deleteOne: async(id:number)=>{
        return await db.delete(tasks).where(eq(tasks.id,id)).returning();
    },
    updateOne: async(id:any,body:any)=>{
        return await db.update(tasks).set({title:body.title,description:body.description,completed:body.completed}).where(eq(tasks.id,id)).returning();
    }
}