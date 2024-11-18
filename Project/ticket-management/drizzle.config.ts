import {defineConfig} from 'drizzle-kit';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
export default defineConfig({
    dialect: 'postgresql',
    out: './Drizzle',
    schema:"./src/db/schema/*.ts",
    dbCredentials: {
        host: process.env.HOST as string,
        port: process.env.PORT ? parseInt(process.env.PORT): 5432,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE as string,
        ssl: {
          rejectUnauthorized: true,
          ca: fs.readFileSync('./ca.pem').toString()
        },
      },

})