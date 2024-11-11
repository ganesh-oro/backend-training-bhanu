import { Hono } from 'hono';
import { db } from './db/dbConnection.ts';
import { serve } from '@hono/node-server';
import { tasks } from './db/schemas/schema.ts';
import { eq } from 'drizzle-orm';
const app = new Hono();
import { taskRoute } from './routes/taskRoute.ts';



app.route('/tasks',taskRoute)


// app.get('/', async(c) => {
//   try{
//     const result = await db.select().from(tasks);
//     return c.json(result);
//   }
//   catch(e){
//     return c.json(e as object)
//   }
// });

// app.post('/add',async(c)=>{
//   try{
//     const body = await c.req.json();
//     const result = await db.insert(tasks).values(body).returning();
//     return c.json(result);
//   }
//   catch(e){
//     return c.json(e as object)
//   }
// })
// app.put('/:id',async(c)=>{
//   try{
//     const idx = parseInt(c.req.param('id'));
//     const body = await c.req.json();
//     const result = await db.update(tasks).set({title:body.title,description:body.description,completed:body.completed}).where(eq(tasks.id,(idx))).returning();
//     return c.json(result);
//   }
//   catch(e){
//     return c.json(e as object)
//   }
// })
// app.delete('/:id',async(c)=>{
//   try{
//     const idx = parseInt(c.req.param('id'));
//     const result = await db.delete(tasks).where(eq(tasks.id,(idx))).returning();
//     if (result.length===0){
//       return c.json({message:"Task not found"})
//     }
//   }
//   catch(e){
//     return c.json(e as object)
//   }

// })

serve({
  fetch:app.fetch,
  port:21071
})
