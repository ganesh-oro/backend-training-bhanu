import { Hono } from "hono";
import { authController } from "../controllers/authController.ts";

export const authrouter = new Hono();

authrouter.post('/login',authController.login);
authrouter.post('/signup',authController.signup);
authrouter.get('/profile',authController.getProfile);
authrouter.delete('/profile',authController.deleteProfile);
authrouter.put('/profile',authController.updateProfile);
authrouter.patch('/profile/updatepassword',authController.updatePassword);
authrouter.post('/forgotpassword',authController.forgotPassword);
authrouter.post('/reset-password/:token',authController.resetPassword);