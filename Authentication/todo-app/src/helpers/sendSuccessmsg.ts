import type { Context } from "hono";

export const SendSuccessMsg = (c: Context, msg: string, status: number, data?: any) => {
    return c.json({
        success:true,
        status,
        msg,
        data
    })
};

