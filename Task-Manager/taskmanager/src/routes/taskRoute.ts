import { taskController } from "../controllers/taskController.ts";
import {Hono} from "hono";

const taskRoute = new Hono();

taskRoute.get('/',taskController.getTasks);
taskRoute.post('/',taskController.addTasks);
taskRoute.delete('/:id',taskController.deleteTasks);
taskRoute.put('/:id',taskController.editTasks);

export default taskRoute;

