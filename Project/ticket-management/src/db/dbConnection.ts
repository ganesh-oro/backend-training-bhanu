import {drizzle} from 'drizzle-orm/node-postgres';
import pg from 'pg';
const {Pool} = pg;
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    host: process.env.HOST,
    port: process.env.PORT ? parseInt(process.env.PORT): 5432,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./ca.pem').toString()
    }
})

export const db = drizzle({client:pool})