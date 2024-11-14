import type { Context } from "hono"

export const ErrorMsg = (c: Context, msg: string, status: number) => {
    return c.json({
        success:false,
        msg,
        status
    })
}