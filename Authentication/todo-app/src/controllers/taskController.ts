import { type Context } from "hono";
import { validate } from "../middleware/validationMiddleware.ts";
import { TaskSchema } from "../validations/vTasksSchema.ts";
import { TaskService } from "../services/dbServices/taskService.ts"

import { SendSuccessMsg } from "../helpers/sendSuccessmsg.ts";
import NotfoundException from "../exceptions/notFoundException.ts";

class TaskController {
    async add(c:Context){
        try{
            const body = await c.req.json();
            const validateData = await validate(TaskSchema,body);
            const res = await TaskService.add(validateData);
            return SendSuccessMsg(c,'Task added successfully',201,res);
        }
        catch(e){
            throw e;
        }
    }  
    async getAll(c:Context){
        try{
            const res = await TaskService.getall();
            if(res.length===0){
                throw new NotfoundException('Tasks not found');
            }
            return SendSuccessMsg(c,'Tasks fetched successfully',200,res);
        }
        catch(e){
            throw e;
        }
    }
    async update(c:Context){
        try{
            const idx = parseInt(c.req.param('id'));
            const body = await c.req.json();
            const res = await TaskService.update(idx,body);
            if(res.length===0){
                throw new NotfoundException('Task not found');
            }
            return SendSuccessMsg(c,'Task updated successfully',200,res);
        }
        catch(e){
            throw e;
        }
    }
    async delete(c:Context){
        try{
            const idx = parseInt(c.req.param('id'));
            const res = await TaskService.delete(idx);
            if(res.length===0){
                throw new NotfoundException('Task not found');
            }
            return SendSuccessMsg(c,'Task deleted successfully',200,res);
        }
        catch(e){
            throw e;
        }
    }
}

export const taskController = new TaskController();
