import type { Context } from "hono";
import * as bcrypt  from 'bcrypt';
import { sendSuccessResp } from "../helper/util.ts";
import { user } from "../db/schemas/user.ts";
import { db } from "../db/dbConnection.ts";
import { eq } from "drizzle-orm";
import { signToken } from "../helper/jwt.ts";

export const register = async(c:Context)=>{
    const {name,email,password} = await c.req.json();
    const hashedpassword = await bcrypt.hash(password,10);

    try{
        const result = await db.insert(user).values({name,email,password:hashedpassword}).returning();
        return sendSuccessResp(c,201,'user registered successfully',result);
    }
    catch(e){
        throw e;
    }
}

// export const login = async (c:Context) => {
//     const { username, password } = await c.req.json();
//     const user = users[username];
    
//     if (user && await bcrypt.compare(password, user.password)) {
//       const token = generateToken(username);
//       c.json({ token });
//     } else {
//       c.json({ error: 'Invalid username or password' }, 401);
//     }
//   };