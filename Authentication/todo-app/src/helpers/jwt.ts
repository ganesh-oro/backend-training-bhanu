import {sign,verify,decode} from 'hono/jwt';
import dotenv from 'dotenv';
dotenv.config();

export const generateJWT = async(payload: any) => {
    const secret = process.env.JWT_SECRET as string;
    const token = await sign(payload,secret);
    return token;
};

