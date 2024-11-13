import { time } from "console";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const user = pgTable('user',{
    id:serial('id').primaryKey(),
    fullName:varchar('full_name').notNull(),
    email:varchar('email').notNull(),
    password:varchar('password').notNull(),
    phone:varchar('phone').notNull(),
    createdAt:timestamp('created_at').defaultNow().notNull(),
  //  updatedAt:timestamp('updated_at')
})