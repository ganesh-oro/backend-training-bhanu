import { text, timestamp } from "drizzle-orm/pg-core";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const todos = pgTable('todos',{
    id: serial('id').primaryKey().notNull(), 
    title:varchar('title').notNull(),
    description:varchar('description').notNull(),
    completed:text('status').default('false'),
    createdAt:timestamp('created_at').notNull().defaultNow()    
})

export type Todo = typeof todos.$inferSelect;

