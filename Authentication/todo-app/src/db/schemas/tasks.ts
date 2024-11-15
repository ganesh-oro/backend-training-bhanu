import { timestamp } from "drizzle-orm/pg-core";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const tasks = pgTable('tasks',{
    id: serial('id').primaryKey().notNull(), 
    title:varchar('title').notNull(),
    description:varchar('description').notNull(),
    completed:varchar('status').notNull(),
    createdAt:timestamp('created_at').notNull().defaultNow()      
})

