import { Hono } from "hono";
import { taskController } from "../controllers/taskController.ts";

export const taskrouter = new Hono();

taskrouter.get('/',taskController.getAll);
taskrouter.post('/',taskController.add);
taskrouter.put('/:id',taskController.update);
taskrouter.delete('/:id',taskController.delete);