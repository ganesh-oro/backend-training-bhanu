// db.js
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import fs from 'fs';
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();

// Use DATABASE_URL directly
const pool = new Pool({
  host: 'pg-24bd0978-mail2bhanuchandar-1899.j.aivencloud.com',
  port: 21071,
  user: 'avnadmin',
  password: 'AVNS_MFHWjAHeVT3oiPLUrBG',
  database: 'defaultdb',
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('./ca.pem').toString()
  },
});

export const db = drizzle({client:pool})
