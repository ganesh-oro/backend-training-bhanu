import type { Context } from "hono";

export const SendSuccessMsg = (c: Context, msg: string, status: number, data: any) => {
    return c.json({
        success:true,
        status,
        msg,
        data
    })
}

export const SuccessmsgLogin = (c:Context,msg:string,status:number,Token:any)=>{
    return c.json({
        success:true,
        status,
        msg,
        Token
    })
}
export const successMsg = (c:Context,msg:string,status:number)=>{
    return c.json({
        success:true,
        status,
        msg
    }
)

}

