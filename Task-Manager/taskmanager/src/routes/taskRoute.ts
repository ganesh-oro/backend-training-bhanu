import { taskController } from "../controllers/taskController.ts";
import {Hono} from "hono"
const taskRoute = new Hono();


taskRoute.get('/',taskController.getTasks);
taskRoute.post('/add',taskController.addTasks);
taskRoute.delete('/delete/:id',taskController.deleteTasks);
taskRoute.put('/edit/:id',taskController.editTasks);


export {taskRoute};

