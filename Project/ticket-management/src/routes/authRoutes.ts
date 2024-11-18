import { Hono } from "hono";
import { authController } from "../controllers/authController.ts";

const authRouter = new Hono();

authRouter.post('/signup', authController.signup);

export default authRouter