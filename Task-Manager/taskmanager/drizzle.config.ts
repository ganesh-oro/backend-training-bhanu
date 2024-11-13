import { defineConfig } from "drizzle-kit";
import fs  from 'fs'
 
export default defineConfig({
  schema: "./src/db/schemas/*.ts",
  out: "./drizzle-schemas",
  dialect: 'postgresql',
  dbCredentials: {
    host: 'pg-24bd0978-mail2bhanuchandar-1899.j.aivencloud.com',
    port: 21071,
    user: 'avnadmin',
    password: 'AVNS_MFHWjAHeVT3oiPLUrBG',
    database: 'defaultdb',
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync('./ca.pem').toString()
    },
  },
});
