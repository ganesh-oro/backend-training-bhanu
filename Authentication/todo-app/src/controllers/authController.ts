import type { Context } from "hono";
import { authservice } from "../services/authService.ts";
import { SendSuccessMsg, SuccessmsgLogin } from "../helpers/sendSuccessmsg.ts";
import { users } from "../db/schemas/user.ts";
import bcrypt from 'bcrypt';
import { generateJWT } from "../helpers/jwt.ts";
import { verify } from "hono/jwt";
import { ErrorMsg } from "../helpers/errorMsg.ts";

export const authController  = {

    login:async(c:Context)=>{
        try{
        const body = await c.req.json();
        const {email,password} = body;
        const existingUser = await authservice.searchOne(email);
        if(existingUser.length===0){
            return ErrorMsg(c,'Email not found',404);
        }
        const password2 = (await authservice.searchPassword(email))[0].password;
        const ispasswordMatch = await bcrypt.compare(password,password2);
        if(!ispasswordMatch){
            return ErrorMsg(c,'Invalid credentials',401);
        }
        const payload = {email,role:"admin",exp:Math.floor(Date.now()/1000)+60*60*24}
        const t = await generateJWT(payload);
        return SuccessmsgLogin(c,'Login successful',200,t);
        // return c.json({password,password2});
    }
    catch(e){
        throw e;
    }
    },
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
            return SendSuccessMsg(c,'User created successfully',200,result);
            }
        // return c.json(email);
         }
    catch(e){
        throw e;
        }
    },
    // showProfile:async(c:Context)=>{
    //     try{
    //         const accessToken = c.req.header('Authorization');
    //         const decodeToken = await verify(accessToken,process.env.JWT_SECRET as string);
    //         const userEmail = decodeToken.sub;
    //         const email = userEmail
    //         const result = await authservice.searchOne(email);
    //         if(result.length===0){
    //             return SendSuccessMsg(c,'User not found',200,{});
    //         }
    //         return SendSuccessMsg(c,'User profile fetched successfully',200,result);
    //     }
    //     catch(e){
    //         throw e;
    //     }
    // },
    deleteProfile:async(c:Context)=>{
        try{
            const body = await c.req.json();
            const {email} = body;
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
            const {email} = body;
            const res = await authservice.updateOne(email,body);
            // if(res.length===0){
            //     return SendSuccessMsg(c,'User not found',200,{});
            // }
            return SendSuccessMsg(c,'User profile updated successfully',200,res);
        }
        catch(e){
            throw e;
        }
    }
}