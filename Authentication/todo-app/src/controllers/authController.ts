import type { Context } from "hono";
import { authservice } from "../services/authService.ts";
import { SendSuccessMsg } from "../helpers/sendSuccessmsg.ts";
import { users } from "../db/schemas/user.ts";
import bcrypt from 'bcrypt';
import { generateJWT } from "../helpers/jwt.ts";
import { verify } from "hono/jwt";
import { verifyToken } from "../middleware/verifyToken.ts";
import { sendEmail } from "../helpers/sendEmail.ts";
import NotfoundException from "../exceptions/notFoundException.ts";
import { parse } from "valibot";
import { LoginSchema } from "../validations/vLoginSchema.ts";
import { validate } from "../middleware/validationMiddleware.ts";
import UnauthorizedException from "../exceptions/unAuthorizedException.ts";
import ConflictException from "../exceptions/conflictException.ts";
import BadRequestException from "../exceptions/badRequestException.ts";
import { SignupSchema } from "../validations/vSignupSchema.ts";


export const authController  = {
    signup:async(c:Context)=>{
        try{
        const body = await c.req.json();
        const validatedData = await validate(SignupSchema,body);
        // const {email} = body
        const existingUser = await authservice.searchOne(validatedData.email);
        if(existingUser.length!==0){
            throw new ConflictException('User already exists');
        }
        const password = validatedData.password;
        validatedData.password = await bcrypt.hash(password,10)
        const result = await authservice.addOne(validatedData);

        if(result){
            return SendSuccessMsg(c,'User created successfully',201,result);
            }
         }
    catch(e){
        throw e;
        }
    },
    login:async(c:Context)=>{
        try{
        const body = await c.req.json();
        const validatedData = await validate(LoginSchema,body)
        
        const existingUser = await authservice.searchOne(validatedData.email);
        if(existingUser.length===0){
            throw new NotfoundException('User not found');
        }
        const password2 = existingUser[0].password;
        const ispasswordMatch = await bcrypt.compare(validatedData.password,password2);
        if(!ispasswordMatch){
            // return ErrorMsg(c,'Invalid credentials',401);
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = {email:validatedData.email,role:"admin",exp:Math.floor(Date.now() / 1000) + 60 * 60};
        const token = await generateJWT(payload);
        const response ={
            token
        }
        return SendSuccessMsg(c,'Login successful',200,response);
    }
    catch(e){
        throw e;
    }
    },
    getProfile:async(c:Context)=>{
        try{
            const userEmail = await verifyToken(c);
            const email = userEmail as string;
            const result = await authservice.searchOne(email);
            if(result.length===0){
                // return ErrorMsg(c,'User not found',404);
                throw new NotfoundException('User not found');
            }
            return SendSuccessMsg(c,'User profile fetched successfully',200,result);
        }
        catch(e){
            throw e;
        }
    },
    deleteProfile:async(c:Context)=>{
        try{
            const userEmail = await verifyToken(c);
            const email = userEmail as string;
            const result = await authservice.searchOne(email);
            if(result.length===0){
                throw new NotfoundException('User not found');
            }
            await authservice.deleteOne(email);
            return SendSuccessMsg(c,'User deleted successfully',200);    
        }
        catch(e){
            throw e;
        }

    },
    updateProfile:async(c:Context)=>{
        try{
            const body = await c.req.json();
            const userEmail = await verifyToken(c);
            const email = userEmail as string;
            const res = await authservice.updateOne(email,body);
            if(res.length===0){
                throw new NotfoundException('User not found');
            }
            return SendSuccessMsg(c,'User profile updated successfully',200,res);
        }
        catch(e){
            throw e;
        }
    },
    updatePassword:async(c:Context)=>{
        try{
            const body = await c.req.json();
            const {newPassword,confirmPassword} = body;
            const userEmail = await verifyToken(c);
            const email = userEmail as string;
            if(newPassword!==confirmPassword){
                throw new BadRequestException('Passwords do not match');
            }
            const password = await bcrypt.hash(newPassword,10);
            const result = await authservice.updatePassword(email,password);
            if(result.length===0){
                // return ErrorMsg(c,'User not found',404);
                throw new NotfoundException('User not found');
            }
            return SendSuccessMsg(c,'Password updated successfully',200,result);
            // return c.json({email,password});
        }
        catch(e){
            throw e;
        }
    },
    forgotPassword:async(c:Context)=>{
        try{
            const body = await c.req.json();
            const {email} = body;
            const result = await authservice.searchOne(email);
            if(result.length===0){
                // return ErrorMsg(c,'User Email is not found',404);
                throw new NotfoundException('User Email is not found');
            }
            const payload = {email,exp:Math.floor(Date.now() / 1000) + 60 * 60};
            const token = await generateJWT(payload);
            await sendEmail(email,token);
            return SendSuccessMsg(c,'Password reset link sent successfully',200); 
            // return c.json(token);  
        }
        catch(e){
            throw e;
        }
    },
    resetPassword:async(c:Context)=>{
        try{
            const token = c.req.param('token');
            const decodeToken = await verify(token,process.env.JWT_SECRET as string)
            if(!decodeToken){
                // return ErrorMsg(c,'Password reset link is invalid',400);
                throw new BadRequestException('Password reset link is invalid');
            }
            const userEmail = decodeToken.email;
            const body = await c.req.json();
            const email = userEmail as string
            const {newPassword,confirmPassword} = body;
            if(newPassword!==confirmPassword){
                // return ErrorMsg(c,'Passwords didnt match',400);
                throw new BadRequestException('Passwords didnt match');
            }
            const password2 = await bcrypt.hash(newPassword,10);
            const result = await authservice.updatePassword(email,password2);
            if(!result){
                throw new NotfoundException('User not found');
                // return ErrorMsg(c,'User not found',404);
            }
            return SendSuccessMsg(c,'Password reset successfully',200);
            // return c.json({email,newPassword,confirmPassword,password2,result});
        }
        catch(e){
            throw e;
        }
    }
}