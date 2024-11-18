import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export const SendSuccessMsg = (c: Context, msg: string, status: StatusCode, data?: any) => {
    c.status(status);
    return c.json({
        success:true,
        status,
        msg,
        data
    })
};


