import { pgTable, serial,boolean,varchar,text} from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks",{
    id: serial('id').primaryKey(),
    title:varchar('title').notNull(),
    description:text('description').notNull(),
    completed:boolean('completed').default(false)

})