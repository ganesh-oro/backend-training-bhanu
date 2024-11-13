import type { Context } from "hono"

export const ErrorMsg = (c: Context, msg: string, status: number) => {
    return c.json({
        sucess:false,
        msg,
        status
    })
}