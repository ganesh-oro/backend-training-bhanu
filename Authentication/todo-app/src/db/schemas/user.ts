import {timestamp, serial, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";


export const users = pgTable('users',{
    id: serial('id').primaryKey().notNull(),
    fullName: varchar('full_name').notNull(),
    email: varchar('email').notNull(),
    password: varchar('password').notNull(),
    phone:varchar('phone'),
    createdAt:timestamp('created_at').notNull().defaultNow(),
    updatedAt:timestamp('updated_at')
})


export type User = typeof users.$inferSelect;