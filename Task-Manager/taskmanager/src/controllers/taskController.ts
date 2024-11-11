import { eq } from "drizzle-orm";
import { db } from "../db/dbConnection.ts";
import { tasks } from "../db/schemas/schema.ts";
import { type Context } from "hono";
export const taskController = {

    getTasks: async(c:Context)=>{
        try{
            const result = await db.select().from(tasks);
            return c.json(result);
        }
        catch(e){
            return c.json(e as object)
        }
    },
    addTasks: async(c:Context)=>{
        try{
            const body = await c.req.json();
            const result = await db.insert(tasks).values(body).returning();
            return c.json(result);
        }
        catch(e){
            return c.json(e as object);
        }
    },
    editTasks: async(c:Context)=>{
        try{
            const idx = parseInt(c.req.param('id'));
            const body = await c.req.json();
            const res = await db.update(tasks).set({title:body.title,description:body.description,completed:body.completed}).where(eq(tasks.id,idx)).returning();
            return c.json(res);
        }
        catch(e){
            return c.json(e as object);
        }
    },
    deleteTasks: async(c:Context)=>{
        try{
            const idx = parseInt(c.req.param('id'));
            const res = await db.delete(tasks).where(eq(tasks.id,idx)).returning();
            if(!res){
                return c.json({message:"task not found"});
            }
            return c.json('Task deleted Successfully');
        }
        catch(e){
            return c.json(e as object);
        }
    } 
}