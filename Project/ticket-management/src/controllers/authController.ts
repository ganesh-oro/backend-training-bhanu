import type { Context } from "hono";

class authcontroller {
    async signup(c:Context){
        try{
            const body = await c.req.json();
            const {name,email,password} = body;
        }catch(err){
        }
    }

}

export const authController = new authcontroller()