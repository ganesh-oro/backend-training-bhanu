import type { Context } from "hono";
import { verify } from "hono/jwt";
import { ErrorMsg } from "../helpers/errorMsg.ts";

export const verifyToken = async(c:Context)=>{
        try{    
            const accessToken = c.req.header('Authorization')??'';
            const token = accessToken.startsWith('Bearer ') ? accessToken.slice(7) : '';
            const decodeToken = await verify(token,process.env.JWT_SECRET as string)
            if(!decodeToken){
                return ErrorMsg(c,'Invalid token',401);
            }
            const userEmail = decodeToken.email;
            return userEmail;
        }
        catch(e){
            throw c.json({error:e});
        }
}