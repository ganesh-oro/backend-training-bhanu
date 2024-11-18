import type { Context } from "hono";
import { authservice } from "../services/authService/authService.ts";
import { SendSuccessMsg } from "../helpers/sendSuccessmsg.ts";
import bcrypt from "bcrypt";
import { generateJWT } from "../helpers/jwt.ts";
import { verify } from "hono/jwt";
import sendEmail from "../services/emailService/sendBrevoEmail.ts";
import NotfoundException from "../exceptions/notFoundException.ts";
import { LoginSchema } from "../validations/vLoginSchema.ts";
import { validate } from "../middleware/validationMiddleware.ts";
import UnauthorizedException from "../exceptions/unAuthorizedException.ts";
import ConflictException from "../exceptions/conflictException.ts";
import BadRequestException from "../exceptions/badRequestException.ts";
import { SignupSchema } from "../validations/vSignupSchema.ts";
import {
  getCookie,
  setCookie,
  deleteCookie,
} from "hono/cookie";

export const authController = {
  signup: async (c: Context) => {
    try {
      const body = await c.req.json();
      const validatedData = await validate(SignupSchema, body);
      const existingUser = await authservice.searchOne(validatedData.email);
      if (existingUser.length !== 0) {
        throw new ConflictException("User already exists");
      }
      // const password = validatedData.password;
      validatedData.password = await bcrypt.hash(validatedData.password, 10);
      const result = await authservice.addOne(validatedData);
      return SendSuccessMsg(c, "User created successfully", 201, result);
    } catch (e) {
      throw e;
    }
  },
  login: async (c: Context) => {
    try {
      const body = await c.req.json();
      const validatedData = await validate(LoginSchema, body);

      const existingUser = await authservice.searchOne(validatedData.email);
      if (existingUser.length === 0) {
        throw new NotfoundException("User not found");
      }
      const password2 = existingUser[0].password;
      const ispasswordMatch = await bcrypt.compare(
        validatedData.password,
        password2
      );
      if (!ispasswordMatch) {
        throw new UnauthorizedException("Invalid credentials");
      }
      const payload = {
        email: validatedData.email,
        role: "admin",
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      };
      const token = await generateJWT(payload);
      setCookie(c, "token", token);
      const response = {
        token,
      };
      return SendSuccessMsg(c, "Login successful", 200, response);
    } catch (e) {
      throw e;
    }
  },
  getProfile: async (c: Context) => {
    try {
      const token: any = getCookie(c, "token");
      if (!token) {
        throw new UnauthorizedException("You are not logged in");
      }
      const res = await verify(token, process.env.JWT_SECRET as string);
      if (!res) {
        throw new UnauthorizedException("Invalid token or token expired");
      }
      const email = res.email as string;
      const result = await authservice.searchOne(email);
      if (result.length === 0) {
        throw new NotfoundException("User not found");
      }
      return SendSuccessMsg(
        c,
        "User profile fetched successfully",
        200,
        result
      );
    } catch (e) {
      throw e;
    }
  },
  deleteProfile: async (c: Context) => {
    try {
      const token: any = getCookie(c, "token");
      if (!token) {
        throw new UnauthorizedException("You are not logged in");
      }
      const res = await verify(token, process.env.JWT_SECRET as string);
      if (!res) {
        throw new UnauthorizedException("Invalid token or token expired");
      }
      const email = res.email as string;
      await authservice.deleteOne(email);
      return SendSuccessMsg(c, "User deleted successfully", 200);
    } catch (e) {
      throw e;
    }
  },
  updateProfile: async (c: Context) => {
    try {
      const body = await c.req.json();
      const token: any = getCookie(c, "token");
      if (!token) {
        throw new UnauthorizedException("You are not logged in");
      }
      const result = await verify(token, process.env.JWT_SECRET as string);
      if (!result) {
        throw new UnauthorizedException("Invalid token or token expired");
      }
      const email = result.email as string;
      const res = await authservice.updateOne(email, body);
      if (res.length === 0) {
        throw new NotfoundException("User not found");
      }
      return SendSuccessMsg(c, "User profile updated successfully", 200, res);
    } catch (e) {
      throw e;
    }
  },
  updatePassword: async (c: Context) => {
    try {
      const body = await c.req.json();
      const { newPassword, confirmPassword } = body;
      const token: any = getCookie(c, "token");
      if (!token) {
        throw new UnauthorizedException("You are not logged in");
      }
      const res = await verify(token, process.env.JWT_SECRET as string);
      if (!res) {
        throw new UnauthorizedException("Invalid token or token expired");
      }
      const email = res.email as string;
      if (newPassword !== confirmPassword) {
        throw new BadRequestException("Passwords do not match");
      }
      const password = await bcrypt.hash(newPassword, 10);
      const result = await authservice.updatePassword(email, password);
      if (result.length === 0) {
        throw new NotfoundException("User not found");
      }
      return SendSuccessMsg(c, "Password updated successfully", 200);
    } catch (e) {
      throw e;
    }
  },
  forgotPassword: async (c: Context) => {
    try {
      const { email } = await c.req.json();
      const result = await authservice.searchOne(email);
      if (result.length === 0) {
        throw new NotfoundException("User Email is not found");
      }
      const payload = { email, exp: Math.floor(Date.now() / 1000) + 60 * 60 };
      const token = await generateJWT(payload);
      await sendEmail(email, token);
      return SendSuccessMsg(c, "Password reset link sent successfully", 200);
    } catch (e) {
      throw e;
    }
  },
  resetPassword: async (c: Context) => {
    try {
      const token = c.req.param("token") as string;
      const decodeToken = await verify(token, process.env.JWT_SECRET as string);
      if (!decodeToken) {
        throw new BadRequestException("Password reset link is invalid");
      }
      const userEmail = decodeToken.email;
      const email = userEmail as string;
      const { newPassword, confirmPassword } = await c.req.json();
      if (newPassword !== confirmPassword) {
        throw new BadRequestException("Passwords didnt match");
      }
      const password2 = await bcrypt.hash(newPassword, 10);
      const result = await authservice.updatePassword(email, password2);
      if (!result) {
        throw new NotfoundException("User not found");
      }
      return SendSuccessMsg(c, "Password reset successfully", 200);
    } catch (e) {
      throw e;
    }
  },
  logOut: async (c: Context) => {
    try {
      const token = getCookie(c, "token");
      if (!token) {
        throw new UnauthorizedException("You are not logged in");
      }
      deleteCookie(c, "token", {
        path: "/",
        secure: false,
        httpOnly: true,
      });
      return SendSuccessMsg(c, "User logged out successfully", 200);
    } catch (e) {
      throw e;
    }
  },
};
