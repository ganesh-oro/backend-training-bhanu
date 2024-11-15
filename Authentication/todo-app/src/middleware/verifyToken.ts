import type { Context } from "hono";
import { verify } from "hono/jwt";
import UnauthorizedException from "../exceptions/unAuthorizedException.ts";

export const verifyToken = async(c:Context)=>{
        try{    
            const accessToken = c.req.header('Authorization')??'';
            const token = accessToken.startsWith('Bearer ') ? accessToken.slice(7) : '';
            const decodeToken = await verify(token,process.env.JWT_SECRET as string)
            // if(!decodeToken){
            // //    return ErrorMsg(c,'Invalid token',401);
            //     throw new UnauthorizedException('Invalid token');
            // }
            const userEmail = decodeToken.email;
            return userEmail;
        }
        catch(e){
            throw new UnauthorizedException('Invalid token or token expired');
        }
}