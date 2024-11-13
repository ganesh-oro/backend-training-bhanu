import {sign,verify,decode} from 'hono/jwt';

import dotenv from 'dotenv';

dotenv.config();    

const secret:string = process.env.JWT_SECRET ?? 'default-secret';
export const signToken = async (id: string) => {
    const payload = {
      sub: id,
      role: 'admin',
      exp: Date.now() + 1000 * 60 * 60 * 24
    };
    return await sign(payload, secret);
}

// const tokenverify = 'token'
// export const decodedPayload = async()=>{
//     return await verify(tokenverify,secret);
// }






// export const verifyToken = (token:string) => jwt.verify(token, process.env.JWT_SECRET);