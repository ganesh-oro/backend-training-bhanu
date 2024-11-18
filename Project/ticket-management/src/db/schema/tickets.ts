import { pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high'])
export const tickets = pgTable('tickets', {
    id: serial('id').primaryKey(),
    title: varchar('title').notNull(),
    description: varchar('description').notNull(),
    priority: priorityEnum().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at')
})

export type Ticket = typeof tickets.$inferSelect;