import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const chats = pgTable('chats', {
    id: serial('id').primaryKey(),
    ticket_id: serial('ticket_id').notNull(),
    sender_id: serial('sender_id').notNull(),
    message: varchar('message').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at')
})

export type Chat = typeof chats.$inferSelect;