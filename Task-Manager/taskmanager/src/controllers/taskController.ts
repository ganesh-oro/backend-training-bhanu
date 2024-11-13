import { eq } from "drizzle-orm";
import { db } from "../db/dbConnection.ts";
import { tasks } from "../db/schemas/schema.ts";
import { type Context } from "hono";
import { sendSuccessResp } from "../helper/util.ts";
import { TaskService } from "../services/dbservice.ts";

export const taskController = {
    getTasks: async(c:Context)=>{
        try{
            const result = await TaskService.getAll();
            return sendSuccessResp(c,200,'tasks fetched successfully',result);
        }
        catch(e){
            throw e;
        }
    },
    addTasks: async(c:Context)=>{
        try{
            const body = await c.req.json();
            const result = await TaskService.addOne(body)
            return sendSuccessResp(c,201,'tasks added successfully',result);

        }
        catch(e){
            throw e
            // return c.json(e as object);
        }
    },
    editTasks: async(c:Context)=>{
        try{
            const idx = parseInt(c.req.param('id'));
            const body = await c.req.json();
            const res = await TaskService.updateOne(idx,body);
            return sendSuccessResp(c,200,'tasks updated successfully',res);
        }
        catch(e){
            throw e;
        }
    },
    deleteTasks: async(c:Context)=>{
        try{
            const idx = parseInt(c.req.param('id'));
            const res = await TaskService.deleteOne(idx);
            if(!res){
                return c.json({message:"task not found"});
            }
            const r = 'task deleted successfully';
            return c.json({status:200,message:r,});
        }
        catch(e){
            throw e;
        }
    } 
};

