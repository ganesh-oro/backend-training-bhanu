import { db } from "../../db/dbConnection.ts"
import { eq } from "drizzle-orm";
import { todos } from "../../db/schemas/todo.ts";

export const TaskService = {
    add:async(body:any)=>{
        return await db.insert(todos).values({...body}).returning();
    },
    getall:async()=>{
        return await db.select().from(todos);
    },
    update:async(id:number,body:any)=>{
        return await db.update(todos).set({...body}).where(eq(todos.id,id)).returning();
    },
    delete:async(id:number)=>{
        return await db.delete(todos).where(eq(todos.id,id)).returning();
    },
}

