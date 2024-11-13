import { type Context } from "hono";
export const sendSuccessResp = async(c:Context,status:number,message:string,data:any)=>{
    return c.json({success:true,status,message,data})
}
