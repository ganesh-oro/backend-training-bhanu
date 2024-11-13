import { Hono } from "hono";
import { authController } from "../controllers/authController.ts";

export const authrouter = new Hono();

authrouter.post('/login',authController.login);
authrouter.post('/signup',authController.signup);
authrouter.post('/profile',authController.showProfile);

