import type { Context } from "hono";
import { authservice } from "../services/authService.ts";
import { SendSuccessMsg, successMsg, SuccessmsgLogin } from "../helpers/sendSuccessmsg.ts";
import { users } from "../db/schemas/user.ts";
import bcrypt from 'bcrypt';
import { generateJWT } from "../helpers/jwt.ts";
import { verify } from "hono/jwt";
import { ErrorMsg } from "../helpers/errorMsg.ts";
import { verifyToken } from "../middleware/verifyToken.ts";
import { sendEmail } from "../helpers/sendEmail.ts";


export const authController  = {
    signup:async(c:Context)=>{
        try{
        const body = await c.req.json();
        const {email} = body
        const existingUser = await authservice.searchOne(email);
        if(existingUser.length!==0){
            return ErrorMsg(c,'User already exists',409);
        }
        const password = body.password
        body.password = await bcrypt.hash(password,10)
        const result = await authservice.addOne(body);
        if(result){
            return SendSuccessMsg(c,'User created successfully',201,result);
            }
        // return c.json(email);
         }
    catch(e){
        throw e;
        }
    },
    login:async(c:Context)=>{
        try{
        const body = await c.req.json();
        const {email,password} = body;
        const existingUser = await authservice.searchOne(email);
        if(existingUser.length===0){
            return ErrorMsg(c,'Email not found',404);
        }
        const password2 = existingUser[0].password;
        // (await authservice.searchPassword(email))[0].password;
        const ispasswordMatch = await bcrypt.compare(password,password2);
        if(!ispasswordMatch){
            return ErrorMsg(c,'Invalid credentials',401);
        }
        const payload = {email,role:"admin",exp:Math.floor(Date.now() / 1000) + 60 * 60};
        const t = await generateJWT(payload);
        return SuccessmsgLogin(c,'Login successful',200,t);
        // return c.json({password,password2,ispasswordMatch});
    }
    catch(e){
        throw e;
    }
    },
    showProfile:async(c:Context)=>{
        try{
            const userEmail = await verifyToken(c);
            const email = userEmail as string;
            const result = await authservice.searchOne(email);
            if(result.length===0){
                return ErrorMsg(c,'User not found',404);
            }
            return SendSuccessMsg(c,'User profile fetched successfully',200,result);
            // return c.text(email);
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
                return ErrorMsg(c,'User not found',404);
            }
            await authservice.deleteOne(email);
            return SendSuccessMsg(c,'User deleted successfully',200,{});    
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
                return ErrorMsg(c,'User not found',404);
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
                return ErrorMsg(c,'Passwords do not match',400);
            }
            const password = await bcrypt.hash(newPassword,10);
            const result = await authservice.updatePassword(email,password);
            if(result.length===0){
                return ErrorMsg(c,'User not found',404);
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
                return ErrorMsg(c,'User Email is not found',404);
            }
            const payload = {email,exp:Math.floor(Date.now() / 1000) + 60 * 60};
            const token = await generateJWT(payload);
            await sendEmail(email,token);
            return successMsg(c,'Password reset link sent successfully',200); 
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
                return ErrorMsg(c,'Password reset link is invalid',400);
            }
            const userEmail = decodeToken.email;
            const body = await c.req.json();
            const email = userEmail as string
            const {newPassword,confirmPassword} = body;
            if(newPassword!==confirmPassword){
                return ErrorMsg(c,'Passwords didnt match',400);
            }
            const password2 = await bcrypt.hash(newPassword,10);
            const result = await authservice.updatePassword(email,password2);
            if(!result){
                return ErrorMsg(c,'User not found',404);
            }
            return successMsg(c,'Password reset successfully',200);
            // return c.json({email,newPassword,confirmPassword,password2,result});
        }
        catch(e){
            throw e;
        }
    }
}