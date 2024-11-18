import { pgTable,serial,varchar,pgEnum,timestamp } from "drizzle-orm/pg-core";


export const roleEnum = pgEnum('role', ['user', 'admin'])

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username').notNull(),
    email: varchar('email').notNull(),
    password: varchar('password').notNull(),
    role: roleEnum(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at')
})

export type User = typeof users.$inferSelect